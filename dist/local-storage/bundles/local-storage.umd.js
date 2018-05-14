(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('local-storage', ['exports', '@angular/core', '@angular/common'], factory) :
	(factory((global['local-storage'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

var LocalStorage = /** @class */ (function () {
    function LocalStorage(platformId) {
        this.platformId = platformId;
    }
    LocalStorage.prototype.getItem = function (index) {
        var value = null;
        if (common.isPlatformBrowser(this.platformId)) {
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
        if (common.isPlatformBrowser(this.platformId)) {
            localStorage.setItem(index, JSON.stringify(value));
        }
    };
    LocalStorage.prototype.removeItem = function (index) {
        if (common.isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(index);
        }
    };
    LocalStorage.prototype.clear = function () {
        if (common.isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    };
    return LocalStorage;
}());
LocalStorage.decorators = [
    { type: core.Injectable, args: [{ providedIn: 'root' },] },
];
LocalStorage.ctorParameters = function () { return [
    { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
]; };
LocalStorage.ngInjectableDef = core.defineInjectable({ factory: function LocalStorage_Factory() { return new LocalStorage(core.inject(core.PLATFORM_ID)); }, token: LocalStorage, providedIn: "root" });

exports.LocalStorage = LocalStorage;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=local-storage.umd.js.map
