import { Injectable, Inject, PLATFORM_ID, defineInjectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

var LocalStorage = /** @class */ (function () {
    function LocalStorage(platformId) {
        this.platformId = platformId;
    }
    LocalStorage.prototype.getItem = function (index) {
        var value = null;
        if (isPlatformBrowser(this.platformId)) {
            try {
                var unparsedValue = null;
                value = (unparsedValue = localStorage.getItem(index)) ? JSON.parse(unparsedValue) : null;
            }
            catch (error) {
                value = null;
            }
        }
        return value;
    };
    LocalStorage.prototype.setItem = function (index, value) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(index, JSON.stringify(value));
        }
    };
    LocalStorage.prototype.removeItem = function (index) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(index);
        }
    };
    LocalStorage.prototype.clear = function () {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    };
    return LocalStorage;
}());
LocalStorage.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
LocalStorage.ctorParameters = function () { return [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
]; };
LocalStorage.ngInjectableDef = defineInjectable({ factory: function LocalStorage_Factory() { return new LocalStorage(inject(PLATFORM_ID)); }, token: LocalStorage, providedIn: "root" });

export { LocalStorage };
//# sourceMappingURL=local-storage.js.map
