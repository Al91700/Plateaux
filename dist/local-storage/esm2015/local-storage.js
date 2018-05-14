import { Injectable, Inject, PLATFORM_ID, defineInjectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LocalStorage {
    /**
     * @param {?} platformId
     */
    constructor(platformId) {
        this.platformId = platformId;
    }
    /**
     * @template T
     * @param {?} index
     * @return {?}
     */
    getItem(index) {
        let /** @type {?} */ value = null;
        if (isPlatformBrowser(this.platformId)) {
            try {
                let /** @type {?} */ unparsedValue = null;
                value = (unparsedValue = localStorage.getItem(index)) ? JSON.parse(unparsedValue) : null;
            }
            catch (/** @type {?} */ error) {
                value = null;
            }
        }
        return value;
    }
    /**
     * @param {?} index
     * @param {?} value
     * @return {?}
     */
    setItem(index, value) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(index, JSON.stringify(value));
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    removeItem(index) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(index);
        }
    }
    /**
     * @return {?}
     */
    clear() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }
}
LocalStorage.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] },
];
/** @nocollapse */
LocalStorage.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
];
/** @nocollapse */ LocalStorage.ngInjectableDef = defineInjectable({ factory: function LocalStorage_Factory() { return new LocalStorage(inject(PLATFORM_ID)); }, token: LocalStorage, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/*
 * Public API Surface of local-storage
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { LocalStorage };
//# sourceMappingURL=local-storage.js.map
