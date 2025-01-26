'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "38ee2d1b3e1e09560790e21bcd289034",
"assets/AssetManifest.bin.json": "b679c09e5b3c7c486d77dcd81c7bae40",
"assets/AssetManifest.json": "65554cddc6f4cb7090715533bc2f0f49",
"assets/assets/audios/aaj-tak-music-part-1-made-with-Voicemod.mp3": "f348dadf0cf68627adf813a5e170abf4",
"assets/assets/audios/ab-tu-gaya-beta-ab-dekh-tu-puneet.mp3": "80d4643850b0b13cb93749262b10dbe3",
"assets/assets/audios/aisa-mat-karo.mp3": "834560970d2cd150736c0bdaf047b150",
"assets/assets/audios/aji-mangal.mp3": "2880e8a1d2e552c9a6b544252dd016f5",
"assets/assets/audios/ammi-bacha-la-re_nC230lBU.mp3": "9cf1d00488155ae80665c6b3ffbb8c75",
"assets/assets/audios/bekar-hai-bhaiya-mai-to-toot-gaya.mp3": "30b0e67b51cf21954cc20f375cc52cbc",
"assets/assets/audios/cat-laugh-meme-1.mp3": "8a9446971cb49e179324168bc29adcd3",
"assets/assets/audios/gadi-wala-aaya-ghar-se-kachra-nikal-47472.mp3": "3a65cd3244d1e0ca1d7a5d952fe3c84a",
"assets/assets/audios/hacker-hai-bhai-hacker-ajjubhai.mp3": "013fa9825b0bef6406e1ff42bf95d45d",
"assets/assets/audios/hey-prabhu-hey-hari-ram-krishna-jagganath_Ew1vEwh.mp3": "355a75a2a25229ce4d539774b222fb68",
"assets/assets/audios/inProgress.mp3": "13f8db832fa22d62b348413e1219b2b5",
"assets/assets/audios/inProgress.ogg": "cf43403bfbef6c52614f34695fbbcd8e",
"assets/assets/audios/main-madarchod-hun-jo-isme-aya-1.mp3": "f4e0521d69357d0e9407a4cab1c8e1f5",
"assets/assets/audios/moye-moye.mp3": "e7b299313a931f793573f8bb1f505a94",
"assets/assets/audios/rolaa-jamana-hai_zoLCy7S.mp3": "47fa04ea3e0888fb8e2c895fe2d2140b",
"assets/assets/audios/tindeck_1.mp3": "6444e7192dd978acbe8e3e5ea2b964e7",
"assets/assets/audios/Voicy_khatam%2520goodbye.mp3": "09e41e35f3c28f871e8ab7670af17049",
"assets/assets/images/background.jpg": "45afc00fbe1b18593e6de0359ff3f574",
"assets/assets/images/BUBBLE.gif": "44184ca7efaa250e5aca1c1c0c6841b0",
"assets/assets/images/bubble.jpg": "9c59895b8201256c05d1681f0f9a3188",
"assets/assets/images/bubble2.png": "644ac357e11d4798601a54c83d72cd55",
"assets/assets/images/bubble3.gif": "eff3ba22c5e72ae5e0a5dc4868898c00",
"assets/assets/images/bubble_static.jpg": "a09bf57b24a52db7840231c54f821c19",
"assets/assets/images/cactus-plant-green-faizah.gif": "f9e5f6a6d0341aa4ae5a5bdd48a80e5f",
"assets/assets/images/image%252011.png": "3f3511f9a2df9c954a1afa01baa4ad3c",
"assets/assets/images/lets.png": "ffe82c50a6395748a4fe3394f9e9f4bc",
"assets/assets/images/pitcher_plant.gif": "86d8146bbdbb367e209ef02385c5f66e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/NOTICES": "d7c8890596036d6f5cad54cef38cf9dd",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "ecbe899b16ba5dd53c9bec819f6939d7",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "99a58c2b412bce383d3efc0aca5ec900",
"/": "99a58c2b412bce383d3efc0aca5ec900",
"main.dart.js": "13194b7c16c5e414d87ff91e377f8688",
"manifest.json": "3c83f7efb8a1e4b23f6503df097fe096",
"version.json": "2df906e65dfcb389a5888523a4d3180b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
