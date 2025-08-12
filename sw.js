const CACHE_NAME = 'alriars-taskmate-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Inline SVG icon for notifications
const NOTIFICATION_ICON = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzQyODVmNCIgcng9IjQiLz48cGF0aCBkPSJNMTkgM0g1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bS01IDE0SDd2LTJoN3Yyem0zLTRIN3YtMmgxMHYyem0wLTRIN1Y3aDEwdjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+';

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - cache first strategy for app shell, network first for data
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle same-origin requests
  if (url.origin === location.origin) {
    // For HTML requests, use cache first with network fallback
    if (request.destination === 'document') {
      event.respondWith(
        caches.match('/index.html')
          .then((cachedResponse) => {
            return cachedResponse || fetch(request);
          })
          .catch(() => {
            return caches.match('/index.html');
          })
      );
      return;
    }

    // For other resources, use cache first
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request).then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response as it can only be consumed once
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          });
        })
        .catch(() => {
          // If both cache and network fail, return offline fallback
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }
        })
    );
  }
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'todo-sync') {
    event.waitUntil(
      syncTodos()
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);
  
  const { notification, action } = event;
  const data = notification.data || {};
  
  // Close the notification
  notification.close();

  // Handle notification actions
  if (action) {
    // Send message to client about the action
    event.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true, type: 'window' })
        .then((clients) => {
          if (clients.length > 0) {
            clients[0].postMessage({
              action: 'notification-click',
              taskId: notification.tag,
              action: action
            });
          }
        })
    );
  } else {
    // Default click behavior - focus the app
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clients) => {
          // Check if the app is already open
          for (let client of clients) {
            if (client.url.includes(location.origin) && 'focus' in client) {
              return client.focus();
            }
          }
          
          // If no window is open, open a new one
          if (self.clients.openWindow) {
            return self.clients.openWindow('/');
          }
        })
    );
  }
});

// Handle push notifications (for future server integration)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
  
  if (!event.data) {
    return;
  }

  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'You have a task reminder!',
      icon: NOTIFICATION_ICON,
      badge: NOTIFICATION_ICON,
      tag: data.tag || 'todo-reminder',
      requireInteraction: true,
      vibrate: [100, 50, 100],
      actions: [
        {
          action: 'complete',
          title: '✅ Mark Complete',
          icon: NOTIFICATION_ICON
        },
        {
          action: 'snooze',
          title: '⏰ Snooze 10min',
          icon: NOTIFICATION_ICON
        }
      ],
      data: data.data || {}
    };

    event.waitUntil(
      self.registration.showNotification(data.title || '📝 Task Reminder', options)
    );
  } catch (error) {
    console.error('[SW] Error handling push notification:', error);
  }
});

// Sync todos function (for future server integration)
async function syncTodos() {
  try {
    console.log('[SW] Syncing todos...');
    
    // Get stored todos from IndexedDB or localStorage
    // This would sync with a server if available
    
    // For now, just log that sync was attempted
    console.log('[SW] Todo sync completed (offline mode)');
  } catch (error) {
    console.error('[SW] Todo sync failed:', error);
    throw error;
  }
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync triggered:', event.tag);
  
  if (event.tag === 'todo-sync') {
    event.waitUntil(syncTodos());
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    
    case 'SCHEDULE_NOTIFICATION':
      // Schedule a notification for a specific time
      scheduleNotification(payload);
      break;
    
    case 'CANCEL_NOTIFICATION':
      // Cancel a scheduled notification
      cancelNotification(payload.taskId);
      break;
    
    default:
      console.log('[SW] Unknown message type:', type);
  }
});

// Schedule notification function
function scheduleNotification(task) {
  if (!task.dateTime) return;
  
  const notificationTime = new Date(task.dateTime).getTime();
  const now = Date.now();
  const delay = notificationTime - now;
  
  if (delay > 0) {
    setTimeout(() => {
      self.registration.showNotification(`📝 Task Reminder: ${task.title}`, {
        body: task.description || 'Time to work on this task!',
        icon: NOTIFICATION_ICON,
        badge: NOTIFICATION_ICON,
        tag: task.id,
        requireInteraction: true,
        vibrate: [100, 50, 100],
        actions: [
          { action: 'complete', title: '✅ Complete' },
          { action: 'snooze', title: '⏰ Snooze' }
        ],
        data: { taskId: task.id }
      });
    }, delay);
  }
}

// Cancel notification function
function cancelNotification(taskId) {
  // This would cancel any scheduled notifications for the task
  console.log('[SW] Canceling notification for task:', taskId);
}