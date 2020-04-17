/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { phoneNumberValidator } from './ngx-intl-tel-input.validator';
import * as lpn from 'google-libphonenumber';
import { SearchCountryField } from './enums/search-country-field.enum';
import { TooltipLabel } from './enums/tooltip-label.enum';
import { CountryISO } from './enums/country-iso.enum';
const ɵ0 = phoneNumberValidator;
export class NgxIntlTelInputComponent {
    /**
     * @param {?} countryCodeData
     */
    constructor(countryCodeData) {
        this.countryCodeData = countryCodeData;
        this.value = '';
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.cssClass = 'form-control';
        this.onlyCountries = [];
        this.enableAutoCountrySelect = true;
        this.searchCountryFlag = false;
        this.searchCountryField = [SearchCountryField.All];
        this.searchCountryPlaceholder = 'Search Country';
        this.maxLength = '';
        this.selectFirstCountry = true;
        this.phoneValidation = true;
        this.id = 'phone';
        this.enableCustomPlaceholder = false;
        this.customPlaceholder = 'Phone Number';
        this.readOnly = false;
        this.countryChange = new EventEmitter();
        this.selectedCountry = {
            areaCodes: undefined,
            dialCode: '',
            flagClass: '',
            iso2: '',
            name: '',
            placeHolder: '',
            priority: 0
        };
        // display the country dial code next to the selected flag
        this.separateDialCode = false;
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        // Has to be 'any' to prevent a need to install @types/google-libphonenumber by the package user...
        this.phoneUtil = lpn.PhoneNumberUtil.getInstance();
        this.disabled = false;
        this.errors = ['Phone number is required.'];
        this.countrySearchText = '';
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.init();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.allCountries && changes['selectedCountryISO']
            && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.getPreferredCountries();
        }
        this.checkSeparateDialCodeStyle();
    }
    /*
            This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
            Ref: http://codelyzer.com/rules/no-life-cycle-call/
        */
    /**
     * @return {?}
     */
    init() {
        this.fetchCountryData();
        if (this.preferredCountries.length) {
            this.getPreferredCountries();
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter((/**
             * @param {?} c
             * @return {?}
             */
            c => this.onlyCountries.includes(c.iso2)));
        }
        if (this.selectFirstCountry) {
            if (this.preferredCountriesInDropDown.length) {
                this.setSelectedCountry(this.preferredCountriesInDropDown[0]);
            }
            else {
                this.setSelectedCountry(this.allCountries[0]);
            }
        }
        this.getSelectedCountry();
        this.checkSeparateDialCodeStyle();
    }
    /**
     * @return {?}
     */
    getPreferredCountries() {
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = [];
            this.preferredCountries.forEach((/**
             * @param {?} iso2
             * @return {?}
             */
            iso2 => {
                /** @type {?} */
                const preferredCountry = this.allCountries.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                (c) => {
                    return c.iso2 === iso2;
                }));
                this.preferredCountriesInDropDown.push(preferredCountry[0]);
            }));
        }
    }
    /**
     * @return {?}
     */
    getSelectedCountry() {
        if (this.selectedCountryISO) {
            this.selectedCountry = this.allCountries.find((/**
             * @param {?} c
             * @return {?}
             */
            c => { return (c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase()); }));
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    this.propagateChange(undefined);
                }
            }
        }
    }
    /**
     * @param {?} country
     * @return {?}
     */
    setSelectedCountry(country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    }
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    searchCountry() {
        if (!this.countrySearchText) {
            this.countryList.nativeElement.querySelector('.country-list li').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
            return;
        }
        /** @type {?} */
        const countrySearchTextLower = this.countrySearchText.toLowerCase();
        /** @type {?} */
        const country = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            if (this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(this.countrySearchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(this.countrySearchText)) {
                        return c;
                    }
                }
            }
        }));
        if (country.length > 0) {
            /** @type {?} */
            const el = this.countryList.nativeElement.querySelector('#' + country[0].iso2);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        }
        this.checkSeparateDialCodeStyle();
    }
    /**
     * @return {?}
     */
    onPhoneNumberChange() {
        this.value = this.phoneNumber;
        /** @type {?} */
        let number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        /** @type {?} */
        let countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.getCountryCode()
                ? this.getCountryIsoCode(number.getCountryCode(), number)
                : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                const newCountry = this.allCountries.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.iso2 === countryCode));
                if (newCountry) {
                    this.selectedCountry = newCountry;
                }
            }
        }
        countryCode = countryCode ? countryCode : this.selectedCountry.iso2;
        this.checkSeparateDialCodeStyle();
        if (!this.value) {
            this.propagateChange(undefined);
        }
        else {
            /** @type {?} */
            const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.value = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
                countryCode: countryCode.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode,
                id: this.id
            });
        }
    }
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    onCountrySelect(country, el) {
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        if (this.phoneNumber && this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            let number;
            try {
                number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
            }
            catch (e) {
            }
            /** @type {?} */
            const intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
            // parse phoneNumber if separate dial code is needed
            if (this.separateDialCode && intlNo) {
                this.value = this.removeDialCode(intlNo);
            }
            this.propagateChange({
                number: this.value,
                internationalNumber: intlNo,
                nationalNumber: number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.NATIONAL) : '',
                countryCode: this.selectedCountry.iso2.toUpperCase(),
                dialCode: '+' + this.selectedCountry.dialCode,
                id: this.id
            });
        }
        else {
            this.propagateChange(undefined);
        }
        el.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onInputKeyPress(event) {
        /** @type {?} */
        const allowedChars = /[0-9\+\-\ ]/;
        /** @type {?} */
        const allowedCtrlChars = /[axcv]/;
        // Allows copy-pasting
        /** @type {?} */
        const allowedOtherKeys = [
            'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
            'Home', 'End', 'Insert', 'Delete', 'Backspace'
        ];
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !(allowedOtherKeys.includes(event.key))) {
            event.preventDefault();
        }
    }
    /**
     * @protected
     * @return {?}
     */
    fetchCountryData() {
        /* Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248) */
        this.allCountries = [];
        this.countryCodeData.allCountries.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
            /** @type {?} */
            const country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: (/** @type {?} */ (c[4])) || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (this.enablePlaceholder) {
                country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            this.allCountries.push(country);
        }));
    }
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    getPhoneNumberPlaceHolder(countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj === undefined) {
            this.init();
        }
        this.phoneNumber = obj;
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.onPhoneNumberChange();
        }), 1);
    }
    /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    getCountryIsoCode(countryCode, number) {
        // Will use this to match area code from the first numbers
        /** @type {?} */
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        /** @type {?} */
        const countries = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.dialCode === countryCode.toString()));
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        /** @type {?} */
        const mainCountry = countries.find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.areaCodes === undefined));
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        /** @type {?} */
        const secondaryCountries = countries.filter((/**
         * @param {?} c
         * @return {?}
         */
        c => c.areaCodes !== undefined));
        /** @type {?} */
        let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
            Interate over each secondary country and check if nationalNumber starts with any of areaCodes available.
            If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((/**
         * @param {?} country
         * @return {?}
         */
        country => {
            country.areaCodes.forEach((/**
             * @param {?} areaCode
             * @return {?}
             */
            areaCode => {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            }));
        }));
        return matchedCountry;
    }
    /**
     * @param {?} placeholder
     * @return {?}
     */
    separateDialCodePlaceHolder(placeholder) {
        return this.removeDialCode(placeholder);
    }
    /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    removeDialCode(phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    }
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    checkSeparateDialCodeStyle() {
        if (this.separateDialCode && this.selectedCountry) {
            /** @type {?} */
            const cntryCd = this.selectedCountry.dialCode;
            this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    }
}
NgxIntlTelInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-intl-tel-input',
                template: "<div class=\"intl-tel-input allow-dropdown\" [ngClass]=\"separateDialCodeClass\">\r\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': readOnly}\" [isDisabled]=\"readOnly\">\r\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\r\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry?.flagClass\"\r\n        [tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\r\n      <div *ngIf=\"separateDialCode\" class=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\r\n      <div class=\"iti-arrow\"></div>\r\n    </div>\r\n    <div *dropdownMenu class=\"dropdown-menu country-dropdown\">\r\n      <div class=\"search-container\" *ngIf=\"searchCountryFlag && searchCountryField\">\r\n        <input id=\"country-search-box\" [(ngModel)]=\"countrySearchText\" (keyup)=\"searchCountry()\"\r\n          (click)=\"$event.stopPropagation()\" [placeholder]=\"searchCountryPlaceholder\" autofocus>\r\n      </div>\r\n      <ul class=\"country-list\" #countryList>\r\n        <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\"\r\n          (click)=\"onCountrySelect(country, focusable)\" [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n        <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\r\n        <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\"\r\n          [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <input type=\"tel\" [id]=\"id\" autocomplete=\"off\" [ngClass]=\"cssClass\" (blur)=\"onTouched()\"\r\n    (keypress)=\"onInputKeyPress($event)\" [(ngModel)]=\"phoneNumber\" (ngModelChange)=\"onPhoneNumberChange()\"\r\n    [disabled]=\"disabled\" [placeholder]=\"enableCustomPlaceholder ? customPlaceholder : separateDialCodePlaceHolder(selectedCountry?.placeHolder || '') \"\r\n    [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\" #focusable [readOnly]=\"readOnly\" [class.disabled]=\"readOnly\" >\r\n</div>",
                providers: [
                    CountryCode,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        // tslint:disable-next-line:no-forward-ref
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => NgxIntlTelInputComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useValue: ɵ0,
                        multi: true,
                    }
                ],
                styles: ["li.country:hover{background-color:rgba(0,0,0,.05)}.selected-flag.dropdown-toggle:after{content:none}.flag-container.disabled{cursor:not-allowed!important}.intl-tel-input.allow-dropdown .flag-container.disabled:hover .selected-flag{background:0 0}.country-dropdown{border:1px solid #ccc;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:1px;border-collapse:collapse}.search-container{position:relative}.search-container input{width:100%;border:none;border-bottom:1px solid #ccc;padding-left:10px}.search-icon{position:absolute;z-index:2;width:25px;margin:1px 10px}.country-list{position:relative;border:none}.intl-tel-input input#country-search-box{padding-left:6px}.intl-tel-input.separate-dial-code .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-2 .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-3 .selected-flag,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-4 .selected-flag{width:93px}.intl-tel-input.separate-dial-code input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-2 input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-3 input,.intl-tel-input.separate-dial-code.allow-dropdown.iti-sdc-4 input{padding-left:98px}input:disabled{background:#f2f2f2;cursor:not-allowed}.disabled{cursor:not-allowed}"]
            }] }
];
/** @nocollapse */
NgxIntlTelInputComponent.ctorParameters = () => [
    { type: CountryCode }
];
NgxIntlTelInputComponent.propDecorators = {
    value: [{ type: Input }],
    preferredCountries: [{ type: Input }],
    enablePlaceholder: [{ type: Input }],
    cssClass: [{ type: Input }],
    onlyCountries: [{ type: Input }],
    enableAutoCountrySelect: [{ type: Input }],
    searchCountryFlag: [{ type: Input }],
    searchCountryField: [{ type: Input }],
    searchCountryPlaceholder: [{ type: Input }],
    maxLength: [{ type: Input }],
    tooltipField: [{ type: Input }],
    selectFirstCountry: [{ type: Input }],
    selectedCountryISO: [{ type: Input }],
    phoneValidation: [{ type: Input }],
    id: [{ type: Input }],
    enableCustomPlaceholder: [{ type: Input }],
    customPlaceholder: [{ type: Input }],
    readOnly: [{ type: Input }],
    countryChange: [{ type: Output }],
    separateDialCode: [{ type: Input }],
    countryList: [{ type: ViewChild, args: ['countryList', { static: false },] }]
};
if (false) {
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.value;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enablePlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.cssClass;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onlyCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enableAutoCountrySelect;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryFlag;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryField;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.searchCountryPlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.maxLength;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.tooltipField;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectFirstCountry;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectedCountryISO;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneValidation;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.id;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.enableCustomPlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.customPlaceholder;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.readOnly;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countryChange;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.selectedCountry;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.separateDialCode;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.separateDialCodeClass;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneNumber;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.allCountries;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.preferredCountriesInDropDown;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.phoneUtil;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.disabled;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.errors;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countrySearchText;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.countryList;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.onTouched;
    /** @type {?} */
    NgxIntlTelInputComponent.prototype.propagateChange;
    /**
     * @type {?}
     * @private
     */
    NgxIntlTelInputComponent.prototype.countryCodeData;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXRFLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztXQWdCekMsb0JBQW9CO0FBS2pDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFtRHBDLFlBQ1MsZUFBNEI7UUFBNUIsb0JBQWUsR0FBZixlQUFlLENBQWE7UUFsRDVCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQUcsY0FBYyxDQUFDO1FBQzFCLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyw0QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHVCQUFrQixHQUF5QixDQUFDLGtCQUFrQixDQUFDLEdB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OztJQUNuQyxpREFBMkM7O0lBQzNDLDJEQUF3Qzs7SUFDeEMscURBQW1DOztJQUNuQyxzREFBNkU7O0lBQzdFLDREQUFxRDs7SUFDckQsNkNBQXdCOztJQUN4QixnREFBb0M7O0lBQ3BDLHNEQUFtQzs7SUFDbkMsc0RBQXdDOztJQUN4QyxtREFBZ0M7O0lBQ2hDLHNDQUFzQjs7SUFDdEIsMkRBQXlDOztJQUN6QyxxREFBNEM7O0lBQzVDLDRDQUEwQjs7SUFFMUIsaURBQStEOztJQUUvRCxtREFRRTs7SUFHRixvREFBa0M7O0lBQ2xDLHlEQUE4Qjs7SUFFOUIsK0NBQWlCOztJQUNqQixnREFBa0M7O0lBQ2xDLGdFQUFrRDs7SUFFbEQsNkNBQW1EOztJQUNuRCw0Q0FBaUI7O0lBQ2pCLDBDQUFtRDs7SUFDbkQscURBQXVCOztJQUV2QiwrQ0FBcUU7O0lBRXJFLDZDQUFzQjs7SUFDdEIsbURBQWtDOzs7OztJQUdqQyxtREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ291bnRyeUNvZGUgfSBmcm9tICcuL2RhdGEvY291bnRyeS1jb2RlJztcclxuaW1wb3J0IHsgcGhvbmVOdW1iZXJWYWxpZGF0b3IgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBDb3VudHJ5IH0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcclxuaW1wb3J0ICogYXMgbHBuIGZyb20gJ2dvb2dsZS1saWJwaG9uZW51bWJlcic7XHJcbmltcG9ydCB7IFNlYXJjaENvdW50cnlGaWVsZCB9IGZyb20gJy4vZW51bXMvc2VhcmNoLWNvdW50cnktZmllbGQuZW51bSc7XHJcbmltcG9ydCB7IFRvb2x0aXBMYWJlbCB9IGZyb20gJy4vZW51bXMvdG9vbHRpcC1sYWJlbC5lbnVtJztcclxuaW1wb3J0IHsgQ291bnRyeUlTTyB9IGZyb20gJy4vZW51bXMvY291bnRyeS1pc28uZW51bSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ25neC1pbnRsLXRlbC1pbnB1dCcsXHJcblx0dGVtcGxhdGVVcmw6ICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5jc3MnXSxcclxuXHRwcm92aWRlcnM6IFtcclxuXHRcdENvdW50cnlDb2RlLFxyXG5cdFx0e1xyXG5cdFx0XHRwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvcndhcmQtcmVmXHJcblx0XHRcdHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5neEludGxUZWxJbnB1dENvbXBvbmVudCksXHJcblx0XHRcdG11bHRpOiB0cnVlXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XHRwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG5cdFx0XHR1c2VWYWx1ZTogcGhvbmVOdW1iZXJWYWxpZGF0b3IsXHJcblx0XHRcdG11bHRpOiB0cnVlLFxyXG5cdFx0fVxyXG5cdF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neEludGxUZWxJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuXHJcblx0QElucHV0KCkgdmFsdWUgPSAnJztcclxuXHRASW5wdXQoKSBwcmVmZXJyZWRDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRASW5wdXQoKSBlbmFibGVQbGFjZWhvbGRlciA9IHRydWU7XHJcblx0QElucHV0KCkgY3NzQ2xhc3MgPSAnZm9ybS1jb250cm9sJztcclxuXHRASW5wdXQoKSBvbmx5Q291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0QElucHV0KCkgZW5hYmxlQXV0b0NvdW50cnlTZWxlY3QgPSB0cnVlO1xyXG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlGbGFnID0gZmFsc2U7XHJcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeUZpZWxkOiBTZWFyY2hDb3VudHJ5RmllbGRbXSA9IFtTZWFyY2hDb3VudHJ5RmllbGQuQWxsXTtcclxuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5UGxhY2Vob2xkZXIgPSAnU2VhcmNoIENvdW50cnknO1xyXG5cdEBJbnB1dCgpIG1heExlbmd0aCA9ICcnO1xyXG5cdEBJbnB1dCgpIHRvb2x0aXBGaWVsZDogVG9vbHRpcExhYmVsO1xyXG5cdEBJbnB1dCgpIHNlbGVjdEZpcnN0Q291bnRyeSA9IHRydWU7XHJcblx0QElucHV0KCkgc2VsZWN0ZWRDb3VudHJ5SVNPOiBDb3VudHJ5SVNPO1xyXG5cdEBJbnB1dCgpIHBob25lVmFsaWRhdGlvbiA9IHRydWU7XHJcblx0QElucHV0KCkgaWQgPSAncGhvbmUnO1xyXG5cdEBJbnB1dCgpIGVuYWJsZUN1c3RvbVBsYWNlaG9sZGVyID0gZmFsc2U7XHJcblx0QElucHV0KCkgY3VzdG9tUGxhY2Vob2xkZXIgPSAnUGhvbmUgTnVtYmVyJztcclxuXHRASW5wdXQoKSByZWFkT25seSA9IGZhbHNlO1xyXG5cclxuXHRAT3V0cHV0KCkgcmVhZG9ubHkgY291bnRyeUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q291bnRyeT4oKTtcclxuXHJcblx0c2VsZWN0ZWRDb3VudHJ5OiBDb3VudHJ5ID0ge1xyXG5cdFx0YXJlYUNvZGVzOiB1bmRlZmluZWQsXHJcblx0XHRkaWFsQ29kZTogJycsXHJcblx0XHRmbGFnQ2xhc3M6ICcnLFxyXG5cdFx0aXNvMjogJycsXHJcblx0XHRuYW1lOiAnJyxcclxuXHRcdHBsYWNlSG9sZGVyOiAnJyxcclxuXHRcdHByaW9yaXR5OiAwXHJcblx0fTtcclxuXHJcblx0Ly8gZGlzcGxheSB0aGUgY291bnRyeSBkaWFsIGNvZGUgbmV4dCB0byB0aGUgc2VsZWN0ZWQgZmxhZ1xyXG5cdEBJbnB1dCgpIHNlcGFyYXRlRGlhbENvZGUgPSBmYWxzZTtcclxuXHRzZXBhcmF0ZURpYWxDb2RlQ2xhc3M6IHN0cmluZztcclxuXHJcblx0cGhvbmVOdW1iZXIgPSAnJztcclxuXHRhbGxDb3VudHJpZXM6IEFycmF5PENvdW50cnk+ID0gW107XHJcblx0cHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bjogQXJyYXk8Q291bnRyeT4gPSBbXTtcclxuXHQvLyBIYXMgdG8gYmUgJ2FueScgdG8gcHJldmVudCBhIG5lZWQgdG8gaW5zdGFsbCBAdHlwZXMvZ29vZ2xlLWxpYnBob25lbnVtYmVyIGJ5IHRoZSBwYWNrYWdlIHVzZXIuLi5cclxuXHRwaG9uZVV0aWw6IGFueSA9IGxwbi5QaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKTtcclxuXHRkaXNhYmxlZCA9IGZhbHNlO1xyXG5cdGVycm9yczogQXJyYXk8YW55PiA9IFsnUGhvbmUgbnVtYmVyIGlzIHJlcXVpcmVkLiddO1xyXG5cdGNvdW50cnlTZWFyY2hUZXh0ID0gJyc7XHJcblxyXG5cdEBWaWV3Q2hpbGQoJ2NvdW50cnlMaXN0JywgeyBzdGF0aWM6IGZhbHNlIH0pIGNvdW50cnlMaXN0OiBFbGVtZW50UmVmO1xyXG5cclxuXHRvblRvdWNoZWQgPSAoKSA9PiB7IH07XHJcblx0cHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgY291bnRyeUNvZGVEYXRhOiBDb3VudHJ5Q29kZVxyXG5cdCkgeyB9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fVxyXG5cclxuXHRuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcblx0XHRpZiAodGhpcy5hbGxDb3VudHJpZXMgJiYgY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ11cclxuXHRcdFx0JiYgY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ10uY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXS5wcmV2aW91c1ZhbHVlKSB7XHJcblx0XHRcdHRoaXMuZ2V0U2VsZWN0ZWRDb3VudHJ5KCk7XHJcblx0XHR9XHJcblx0XHRpZiAoY2hhbmdlcy5wcmVmZXJyZWRDb3VudHJpZXMpIHtcclxuXHRcdFx0dGhpcy5nZXRQcmVmZXJyZWRDb3VudHJpZXMoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHR9XHJcblxyXG5cdC8qXHJcblx0XHRUaGlzIGlzIGEgd3JhcHBlciBtZXRob2QgdG8gYXZvaWQgY2FsbGluZyB0aGlzLm5nT25Jbml0KCkgaW4gd3JpdGVWYWx1ZSgpLlxyXG5cdFx0UmVmOiBodHRwOi8vY29kZWx5emVyLmNvbS9ydWxlcy9uby1saWZlLWN5Y2xlLWNhbGwvXHJcblx0Ki9cclxuXHRpbml0KCkge1xyXG5cdFx0dGhpcy5mZXRjaENvdW50cnlEYXRhKCk7XHJcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuZ2V0UHJlZmVycmVkQ291bnRyaWVzKCk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLmFsbENvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IHRoaXMub25seUNvdW50cmllcy5pbmNsdWRlcyhjLmlzbzIpKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLnNlbGVjdEZpcnN0Q291bnRyeSkge1xyXG5cdFx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93blswXSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5hbGxDb3VudHJpZXNbMF0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xyXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG5cdH1cclxuXHJcblx0Z2V0UHJlZmVycmVkQ291bnRyaWVzKCkge1xyXG5cdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24gPSBbXTtcclxuXHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaChpc28yID0+IHtcclxuXHRcdFx0XHRjb25zdCBwcmVmZXJyZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKChjKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYy5pc28yID09PSBpc28yO1xyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ucHVzaChwcmVmZXJyZWRDb3VudHJ5WzBdKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRTZWxlY3RlZENvdW50cnkoKSB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZENvdW50cnlJU08pIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4geyByZXR1cm4gKGMuaXNvMi50b0xvd2VyQ2FzZSgpID09PSB0aGlzLnNlbGVjdGVkQ291bnRyeUlTTy50b0xvd2VyQ2FzZSgpKTsgfSk7XHJcblx0XHRcdGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xyXG5cdFx0XHRcdGlmICh0aGlzLnBob25lTnVtYmVyKSB7XHJcblx0XHRcdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodW5kZWZpbmVkKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5OiBDb3VudHJ5KSB7XHJcblx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IGNvdW50cnk7XHJcblx0XHR0aGlzLmNvdW50cnlDaGFuZ2UuZW1pdChjb3VudHJ5KTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBTZWFyY2ggY291bnRyeSBiYXNlZCBvbiBjb3VudHJ5IG5hbWUsIGlzbzIsIGRpYWxDb2RlIG9yIGFsbCBvZiB0aGVtLlxyXG5cdCAqL1xyXG5cdHNlYXJjaENvdW50cnkoKSB7XHJcblx0XHRpZiAoIXRoaXMuY291bnRyeVNlYXJjaFRleHQpIHtcclxuXHRcdFx0dGhpcy5jb3VudHJ5TGlzdC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3VudHJ5LWxpc3QgbGknKS5zY3JvbGxJbnRvVmlldyh7XHJcblx0XHRcdFx0YmVoYXZpb3I6ICdzbW9vdGgnLFxyXG5cdFx0XHRcdGJsb2NrOiAnbmVhcmVzdCcsXHJcblx0XHRcdFx0aW5saW5lOiAnbmVhcmVzdCdcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGNvbnN0IGNvdW50cnlTZWFyY2hUZXh0TG93ZXIgPSB0aGlzLmNvdW50cnlTZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRjb25zdCBjb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4ge1xyXG5cdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuQWxsKSA+IC0xKSB7XHJcblx0XHRcdFx0Ly8gU2VhcmNoIGluIGFsbCBmaWVsZHNcclxuXHRcdFx0XHRpZiAoYy5pc28yLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjLm5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGMuZGlhbENvZGUuc3RhcnRzV2l0aCh0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIE9yIHNlYXJjaCBieSBzcGVjaWZpYyBTZWFyY2hDb3VudHJ5RmllbGQocylcclxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuSXNvMikgPiAtMSkge1xyXG5cdFx0XHRcdFx0aWYgKGMuaXNvMi50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5OYW1lKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRpZiAoYy5uYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLkRpYWxDb2RlKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGNvdW50cnkubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRjb25zdCBlbCA9IHRoaXMuY291bnRyeUxpc3QubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNvdW50cnlbMF0uaXNvMik7XHJcblx0XHRcdGlmIChlbCkge1xyXG5cdFx0XHRcdGVsLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ25lYXJlc3QnLCBpbmxpbmU6ICduZWFyZXN0JyAgfSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25QaG9uZU51bWJlckNoYW5nZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xyXG5cclxuXHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcclxuXHRcdHRyeSB7XHJcblx0XHRcdG51bWJlciA9IHRoaXMucGhvbmVVdGlsLnBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IGNvdW50cnlDb2RlID0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcclxuXHRcdC8vIGF1dG8gc2VsZWN0IGNvdW50cnkgYmFzZWQgb24gdGhlIGV4dGVuc2lvbiAoYW5kIGFyZWFDb2RlIGlmIG5lZWRlZCkgKGUuZyBzZWxlY3QgQ2FuYWRhIGlmIG51bWJlciBzdGFydHMgd2l0aCArMSA0MTYpXHJcblx0XHRpZiAodGhpcy5lbmFibGVBdXRvQ291bnRyeVNlbGVjdCkge1xyXG5cdFx0XHRjb3VudHJ5Q29kZSA9IG51bWJlciAmJiBudW1iZXIuZ2V0Q291bnRyeUNvZGUoKVxyXG5cdFx0XHRcdD8gdGhpcy5nZXRDb3VudHJ5SXNvQ29kZShudW1iZXIuZ2V0Q291bnRyeUNvZGUoKSwgbnVtYmVyKVxyXG5cdFx0XHRcdDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcclxuXHRcdFx0aWYgKGNvdW50cnlDb2RlICYmIGNvdW50cnlDb2RlICE9PSB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yKSB7XHJcblx0XHRcdFx0Y29uc3QgbmV3Q291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiBjLmlzbzIgPT09IGNvdW50cnlDb2RlKTtcclxuXHRcdFx0XHRpZiAobmV3Q291bnRyeSkge1xyXG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBuZXdDb3VudHJ5O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Y291bnRyeUNvZGUgPSBjb3VudHJ5Q29kZSA/IGNvdW50cnlDb2RlIDogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMjtcclxuXHJcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLnZhbHVlKSB7XHJcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHVuZGVmaW5lZCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjb25zdCBpbnRsTm8gPSBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiAnJztcclxuXHJcblx0XHRcdC8vIHBhcnNlIHBob25lTnVtYmVyIGlmIHNlcGFyYXRlIGRpYWwgY29kZSBpcyBuZWVkZWRcclxuXHRcdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBpbnRsTm8pIHtcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XHJcblx0XHRcdFx0bnVtYmVyOiB0aGlzLnZhbHVlLFxyXG5cdFx0XHRcdGludGVybmF0aW9uYWxOdW1iZXI6IGludGxObyxcclxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxyXG5cdFx0XHRcdGNvdW50cnlDb2RlOiBjb3VudHJ5Q29kZS50b1VwcGVyQ2FzZSgpLFxyXG5cdFx0XHRcdGRpYWxDb2RlOiAnKycgKyB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZSxcclxuXHRcdFx0XHRpZDogdGhpcy5pZFxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbkNvdW50cnlTZWxlY3QoY291bnRyeTogQ291bnRyeSwgZWwpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KGNvdW50cnkpO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHJcblx0XHRpZiAodGhpcy5waG9uZU51bWJlciAmJiB0aGlzLnBob25lTnVtYmVyLmxlbmd0aCA+IDApIHtcclxuXHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XHJcblxyXG5cdFx0XHRsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRjb25zdCBpbnRsTm8gPSBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiAnJztcclxuXHJcblx0XHRcdC8vIHBhcnNlIHBob25lTnVtYmVyIGlmIHNlcGFyYXRlIGRpYWwgY29kZSBpcyBuZWVkZWRcclxuXHRcdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBpbnRsTm8pIHtcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5yZW1vdmVEaWFsQ29kZShpbnRsTm8pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh7XHJcblx0XHRcdFx0bnVtYmVyOiB0aGlzLnZhbHVlLFxyXG5cdFx0XHRcdGludGVybmF0aW9uYWxOdW1iZXI6IGludGxObyxcclxuXHRcdFx0XHRuYXRpb25hbE51bWJlcjogbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0Lk5BVElPTkFMKSA6ICcnLFxyXG5cdFx0XHRcdGNvdW50cnlDb2RlOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCksXHJcblx0XHRcdFx0ZGlhbENvZGU6ICcrJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlLFxyXG5cdFx0XHRcdGlkOiB0aGlzLmlkXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodW5kZWZpbmVkKTtcclxuXHRcdH1cclxuXHJcblx0XHRlbC5mb2N1cygpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uSW5wdXRLZXlQcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgYWxsb3dlZENoYXJzID0gL1swLTlcXCtcXC1cXCBdLztcclxuXHRcdGNvbnN0IGFsbG93ZWRDdHJsQ2hhcnMgPSAvW2F4Y3ZdLzsgLy8gQWxsb3dzIGNvcHktcGFzdGluZ1xyXG5cdFx0Y29uc3QgYWxsb3dlZE90aGVyS2V5cyA9IFtcclxuXHRcdFx0J0Fycm93TGVmdCcsICdBcnJvd1VwJywgJ0Fycm93UmlnaHQnLCAnQXJyb3dEb3duJyxcclxuXHRcdFx0J0hvbWUnLCAnRW5kJywgJ0luc2VydCcsICdEZWxldGUnLCAnQmFja3NwYWNlJ1xyXG5cdFx0XTtcclxuXHJcblx0XHRpZiAoIWFsbG93ZWRDaGFycy50ZXN0KGV2ZW50LmtleSlcclxuXHRcdFx0JiYgIShldmVudC5jdHJsS2V5ICYmIGFsbG93ZWRDdHJsQ2hhcnMudGVzdChldmVudC5rZXkpKVxyXG5cdFx0XHQmJiAhKGFsbG93ZWRPdGhlcktleXMuaW5jbHVkZXMoZXZlbnQua2V5KSkpIHtcclxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBmZXRjaENvdW50cnlEYXRhKCk6IHZvaWQge1xyXG5cdFx0LyogQ2xlYXJpbmcgdGhlIGxpc3QgdG8gYXZvaWQgZHVwbGljYXRlcyAoaHR0cHM6Ly9naXRodWIuY29tL3dlYmNhdDEyMzQ1L25neC1pbnRsLXRlbC1pbnB1dC9pc3N1ZXMvMjQ4KSAqL1xyXG5cdFx0dGhpcy5hbGxDb3VudHJpZXMgPSBbXTtcclxuXHJcblx0XHR0aGlzLmNvdW50cnlDb2RlRGF0YS5hbGxDb3VudHJpZXMuZm9yRWFjaChjID0+IHtcclxuXHRcdFx0Y29uc3QgY291bnRyeTogQ291bnRyeSA9IHtcclxuXHRcdFx0XHRuYW1lOiBjWzBdLnRvU3RyaW5nKCksXHJcblx0XHRcdFx0aXNvMjogY1sxXS50b1N0cmluZygpLFxyXG5cdFx0XHRcdGRpYWxDb2RlOiBjWzJdLnRvU3RyaW5nKCksXHJcblx0XHRcdFx0cHJpb3JpdHk6ICtjWzNdIHx8IDAsXHJcblx0XHRcdFx0YXJlYUNvZGVzOiBjWzRdIGFzIHN0cmluZ1tdIHx8IHVuZGVmaW5lZCxcclxuXHRcdFx0XHRmbGFnQ2xhc3M6IGNbMV0udG9TdHJpbmcoKS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxyXG5cdFx0XHRcdHBsYWNlSG9sZGVyOiAnJ1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKHRoaXMuZW5hYmxlUGxhY2Vob2xkZXIpIHtcclxuXHRcdFx0XHRjb3VudHJ5LnBsYWNlSG9sZGVyID0gdGhpcy5nZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMucHVzaChjb3VudHJ5KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeUNvZGU6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5waG9uZVV0aWwuZm9ybWF0KHRoaXMucGhvbmVVdGlsLmdldEV4YW1wbGVOdW1iZXIoY291bnRyeUNvZGUpLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHJldHVybiBlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcblx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xyXG5cdH1cclxuXHJcblx0cmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG5cdFx0dGhpcy5vblRvdWNoZWQgPSBmbjtcclxuXHR9XHJcblxyXG5cdHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0dGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcblx0fVxyXG5cclxuXHR3cml0ZVZhbHVlKG9iajogYW55KTogdm9pZCB7XHJcblx0XHRpZiAob2JqID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5pbml0KCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnBob25lTnVtYmVyID0gb2JqO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xyXG5cdFx0fSwgMSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENvdW50cnlJc29Db2RlKGNvdW50cnlDb2RlOiBudW1iZXIsIG51bWJlcjogbHBuLlBob25lTnVtYmVyKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuXHRcdC8vIFdpbGwgdXNlIHRoaXMgdG8gbWF0Y2ggYXJlYSBjb2RlIGZyb20gdGhlIGZpcnN0IG51bWJlcnNcclxuXHRcdGNvbnN0IHJhd051bWJlciA9IG51bWJlclsndmFsdWVzXyddWycyJ10udG9TdHJpbmcoKTtcclxuXHRcdC8vIExpc3Qgb2YgYWxsIGNvdW50cmllcyB3aXRoIGNvdW50cnlDb2RlIChjYW4gYmUgbW9yZSB0aGFuIG9uZS4gZS54LiBVUywgQ0EsIERPLCBQUiBhbGwgaGF2ZSArMSBjb3VudHJ5Q29kZSlcclxuXHRcdGNvbnN0IGNvdW50cmllcyA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IGMuZGlhbENvZGUgPT09IGNvdW50cnlDb2RlLnRvU3RyaW5nKCkpO1xyXG5cdFx0Ly8gTWFpbiBjb3VudHJ5IGlzIHRoZSBjb3VudHJ5LCB3aGljaCBoYXMgbm8gYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cclxuXHRcdGNvbnN0IG1haW5Db3VudHJ5ID0gY291bnRyaWVzLmZpbmQoYyA9PiBjLmFyZWFDb2RlcyA9PT0gdW5kZWZpbmVkKTtcclxuXHRcdC8vIFNlY29uZGFyeSBjb3VudHJpZXMgYXJlIGFsbCBjb3VudHJpZXMsIHdoaWNoIGhhdmUgYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cclxuXHRcdGNvbnN0IHNlY29uZGFyeUNvdW50cmllcyA9IGNvdW50cmllcy5maWx0ZXIoYyA9PiBjLmFyZWFDb2RlcyAhPT0gdW5kZWZpbmVkKTtcclxuXHRcdGxldCBtYXRjaGVkQ291bnRyeSA9IG1haW5Db3VudHJ5ID8gbWFpbkNvdW50cnkuaXNvMiA6IHVuZGVmaW5lZDtcclxuXHJcblx0XHQvKlxyXG5cdFx0XHRJbnRlcmF0ZSBvdmVyIGVhY2ggc2Vjb25kYXJ5IGNvdW50cnkgYW5kIGNoZWNrIGlmIG5hdGlvbmFsTnVtYmVyIHN0YXJ0cyB3aXRoIGFueSBvZiBhcmVhQ29kZXMgYXZhaWxhYmxlLlxyXG5cdFx0XHRJZiBubyBtYXRjaGVzIGZvdW5kLCBmYWxsYmFjayB0byB0aGUgbWFpbiBjb3VudHJ5LlxyXG5cdFx0Ki9cclxuXHRcdHNlY29uZGFyeUNvdW50cmllcy5mb3JFYWNoKGNvdW50cnkgPT4ge1xyXG5cdFx0XHRjb3VudHJ5LmFyZWFDb2Rlcy5mb3JFYWNoKGFyZWFDb2RlID0+IHtcclxuXHRcdFx0XHRpZiAocmF3TnVtYmVyLnN0YXJ0c1dpdGgoYXJlYUNvZGUpKSB7XHJcblx0XHRcdFx0XHRtYXRjaGVkQ291bnRyeSA9IGNvdW50cnkuaXNvMjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIG1hdGNoZWRDb3VudHJ5O1xyXG5cdH1cclxuXHJcblx0c2VwYXJhdGVEaWFsQ29kZVBsYWNlSG9sZGVyKHBsYWNlaG9sZGVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHRoaXMucmVtb3ZlRGlhbENvZGUocGxhY2Vob2xkZXIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSByZW1vdmVEaWFsQ29kZShwaG9uZU51bWJlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgcGhvbmVOdW1iZXIpIHtcclxuXHRcdFx0cGhvbmVOdW1iZXIgPSBwaG9uZU51bWJlci5zdWJzdHIocGhvbmVOdW1iZXIuaW5kZXhPZignICcpICsgMSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcGhvbmVOdW1iZXI7XHJcblx0fVxyXG5cclxuXHQvLyBhZGp1c3QgaW5wdXQgYWxpZ25tZW50XHJcblx0cHJpdmF0ZSBjaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpIHtcclxuXHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgdGhpcy5zZWxlY3RlZENvdW50cnkpIHtcclxuXHRcdFx0Y29uc3QgY250cnlDZCA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlO1xyXG5cdFx0XHR0aGlzLnNlcGFyYXRlRGlhbENvZGVDbGFzcyA9ICdzZXBhcmF0ZS1kaWFsLWNvZGUgaXRpLXNkYy0nICsgKGNudHJ5Q2QubGVuZ3RoICsgMSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnNlcGFyYXRlRGlhbENvZGVDbGFzcyA9ICcnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn1cclxuIl19