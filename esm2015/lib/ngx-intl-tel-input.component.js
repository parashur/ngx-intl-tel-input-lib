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
        this.enter = new EventEmitter();
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
                template: "<div class=\"intl-tel-input allow-dropdown\" [ngClass]=\"separateDialCodeClass\">\r\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': readOnly}\" [isDisabled]=\"readOnly\">\r\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\r\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry?.flagClass\"\r\n        [tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\r\n      <div *ngIf=\"separateDialCode\" class=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\r\n      <div class=\"iti-arrow\"></div>\r\n    </div>\r\n    <div *dropdownMenu class=\"dropdown-menu country-dropdown\">\r\n      <div class=\"search-container\" *ngIf=\"searchCountryFlag && searchCountryField\">\r\n        <input id=\"country-search-box\" [(ngModel)]=\"countrySearchText\" (keyup)=\"searchCountry()\"\r\n          (click)=\"$event.stopPropagation()\" [placeholder]=\"searchCountryPlaceholder\" autofocus>\r\n      </div>\r\n      <ul class=\"country-list\" #countryList>\r\n        <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\"\r\n          (click)=\"onCountrySelect(country, focusable)\" [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n        <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\r\n        <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\"\r\n          [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <input type=\"tel\" [id]=\"id\" autocomplete=\"off\" [ngClass]=\"cssClass\" (blur)=\"onTouched()\"\r\n    (keypress)=\"onInputKeyPress($event)\" [(ngModel)]=\"phoneNumber\" (ngModelChange)=\"onPhoneNumberChange()\" (keydown.enter)=\"enter.emit()\"\r\n    [disabled]=\"disabled\" [placeholder]=\"enableCustomPlaceholder ? customPlaceholder : separateDialCodePlaceHolder(selectedCountry?.placeHolder || '') \"\r\n    [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\" #focusable [readOnly]=\"readOnly\" [class.disabled]=\"readOnly\" >\r\n</div>\r\n",
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
    enter: [{ type: Output }],
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
    NgxIntlTelInputComponent.prototype.enter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXRFLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztXQWdCekMsb0JBQW9CO0FBS2pDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7SUFvRHBDLFlBQ1MsZUFBNEI7UUFBNUIsb0JBQWUsR0FBZixlQUFlLENBQWE7UUFuRDVCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCx1QkFBa0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQUcsY0FBYyxDQUFDO1FBQzFCLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztRQUNsQyw0QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDL0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQzFCLHVCQUFrQixHQUF5QixDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLDZCQUF3QixHQUFHLGdCQUFnQixDQUFDO1FBQzVDLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZix1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFFMUIsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBRSxHQUFHLE9BQU8sQ0FBQztRQUNiLDRCQUF1QixHQUFHLEtBQUssQ0FBQztRQUNoQyxzQkFBaUIsR0FBRyxjQUFjLENBQUM7UUFDbkMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVQLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUM1QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVuRCxvQkFBZSxHQUFZO1lBQzFCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFFBQVEsRUFBRSxFQUFFO1lBQ1osU0FBUyxFQUFFLEVBQUU7WUFDYixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsV0FBVyxFQUFFLEVBQUU7WUFDZixRQUFRLEVBQUUsQ0FBQztTQUNYLENBQUM7O1FBR08scUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR2xDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLGlCQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUNsQyxpQ0FBNEIsR0FBbUIsRUFBRSxDQUFDOztRQUVsRCxjQUFTLEdBQVEsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuRCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLFdBQU0sR0FBZSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDbkQsc0JBQWlCLEdBQUcsRUFBRSxDQUFDO1FBSXZCLGNBQVM7OztRQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztRQUN0QixvQkFBZTs7OztRQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUM7SUFJOUIsQ0FBQzs7OztJQUVMLFFBQVE7UUFDUCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDO2VBQ2xELE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxhQUFhLEVBQUU7WUFDL0YsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDMUI7UUFDRCxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRTtZQUMvQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7Ozs7O0lBTUQsSUFBSTtRQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsNEJBQTRCLENBQUMsTUFBTSxFQUFFO2dCQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5QztTQUNEO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELHFCQUFxQjtRQUNwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTzs7OztZQUFDLElBQUksQ0FBQyxFQUFFOztzQkFDaEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNOzs7O2dCQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZELE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQ3hCLENBQUMsRUFBQztnQkFFRixJQUFJLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxFQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDakIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUk7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7WUFDakksSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN6QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNoQzthQUNEO1NBQ0Q7SUFDRixDQUFDOzs7OztJQUVELGtCQUFrQixDQUFDLE9BQWdCO1FBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBTUQsYUFBYTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUMsY0FBYyxDQUFDO2dCQUMvRSxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE1BQU0sRUFBRSxTQUFTO2FBQ2pCLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUDs7Y0FDSyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFOztjQUM3RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNqRSx1QkFBdUI7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsRUFBRTtvQkFDNUQsT0FBTyxDQUFDLENBQUM7aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO29CQUM1RCxPQUFPLENBQUMsQ0FBQztpQkFDVDtnQkFDRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO29CQUNsRCxPQUFPLENBQUMsQ0FBQztpQkFDVDthQUNEO2lCQUFNO2dCQUNOLDhDQUE4QztnQkFDOUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNsRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7d0JBQzVELE9BQU8sQ0FBQyxDQUFDO3FCQUNUO2lCQUNEO2dCQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDbEUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO3dCQUM1RCxPQUFPLENBQUMsQ0FBQztxQkFDVDtpQkFDRDtnQkFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3RFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7d0JBQ2xELE9BQU8sQ0FBQyxDQUFDO3FCQUNUO2lCQUNEO2FBQ0Q7UUFDRixDQUFDLEVBQUM7UUFFRixJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztrQkFDakIsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM5RSxJQUFJLEVBQUUsRUFBRTtnQkFDUCxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUcsQ0FBQyxDQUFDO2FBQ2hGO1NBQ0Q7UUFFRCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRU0sbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7WUFFMUIsTUFBdUI7UUFDM0IsSUFBSTtZQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDekY7UUFBQyxPQUFPLENBQUMsRUFBRTtTQUNYOztZQUVHLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUk7UUFDM0MsdUhBQXVIO1FBQ3ZILElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLFdBQVcsR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTtnQkFDOUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxDQUFDO2dCQUN6RCxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDN0IsSUFBSSxXQUFXLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFOztzQkFDdkQsVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFDO2dCQUN0RSxJQUFJLFVBQVUsRUFBRTtvQkFDZixJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztpQkFDbEM7YUFDRDtTQUNEO1FBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztRQUVwRSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO2FBQU07O2tCQUNBLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFFL0Ysb0RBQW9EO1lBQ3BELElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sRUFBRTtnQkFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pDO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQztnQkFDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNsQixtQkFBbUIsRUFBRSxNQUFNO2dCQUMzQixjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzRixXQUFXLEVBQUUsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDdEMsUUFBUSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7Z0JBQzdDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTthQUNYLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQzs7Ozs7O0lBRU0sZUFBZSxDQUFDLE9BQWdCLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFFbEMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7O2dCQUUxQixNQUF1QjtZQUMzQixJQUFJO2dCQUNILE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDekY7WUFBQyxPQUFPLENBQUMsRUFBRTthQUNYOztrQkFFSyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBRS9GLG9EQUFvRDtZQUNwRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxNQUFNLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QztZQUVELElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDbEIsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0IsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDM0YsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEQsUUFBUSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVE7Z0JBQzdDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTthQUNYLENBQUMsQ0FBQztTQUNIO2FBQU07WUFDTixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQzs7Ozs7SUFFTSxlQUFlLENBQUMsS0FBb0I7O2NBQ3BDLFlBQVksR0FBRyxhQUFhOztjQUM1QixnQkFBZ0IsR0FBRyxRQUFROzs7Y0FDM0IsZ0JBQWdCLEdBQUc7WUFDeEIsV0FBVyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVztZQUNqRCxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVztTQUM5QztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7ZUFDN0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztlQUNwRCxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzVDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN2QjtJQUNGLENBQUM7Ozs7O0lBRVMsZ0JBQWdCO1FBQ3pCLDBHQUEwRztRQUMxRyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUU7O2tCQUN2QyxPQUFPLEdBQVk7Z0JBQ3hCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUNyQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNwQixTQUFTLEVBQUUsbUJBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFZLElBQUksU0FBUztnQkFDeEMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDOUMsV0FBVyxFQUFFLEVBQUU7YUFDZjtZQUVELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO2dCQUMzQixPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7YUFDakY7WUFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFDLEVBQUMsQ0FBQztJQUNKLENBQUM7Ozs7OztJQUVTLHlCQUF5QixDQUFDLFdBQW1CO1FBQ3RELElBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2hIO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsQ0FBQztTQUNUO0lBQ0YsQ0FBQzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFPO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsRUFBTztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLEdBQVE7UUFDbEIsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsVUFBVTs7O1FBQUMsR0FBRyxFQUFFO1lBQ2YsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDNUIsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7OztJQUVPLGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsTUFBdUI7OztjQUUvRCxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRTs7O2NBRTdDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFDOzs7Y0FFaEYsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQzs7O2NBRTVELGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQzs7WUFDdkUsY0FBYyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztRQUUvRDs7O1VBR0U7UUFDRixrQkFBa0IsQ0FBQyxPQUFPOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPOzs7O1lBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDbkMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7aUJBQzlCO1lBQ0YsQ0FBQyxFQUFDLENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztRQUVILE9BQU8sY0FBYyxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsMkJBQTJCLENBQUMsV0FBbUI7UUFDOUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxXQUFtQjtRQUN6QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxXQUFXLEVBQUU7WUFDekMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMvRDtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3BCLENBQUM7Ozs7OztJQUdPLDBCQUEwQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFOztrQkFDNUMsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUTtZQUM3QyxJQUFJLENBQUMscUJBQXFCLEdBQUcsNkJBQTZCLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2xGO2FBQU07WUFDTixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO1NBQ2hDO0lBQ0YsQ0FBQzs7O1lBNVlELFNBQVMsU0FBQztnQkFDVixRQUFRLEVBQUUsb0JBQW9CO2dCQUM5Qixna0ZBQWtEO2dCQUVsRCxTQUFTLEVBQUU7b0JBQ1YsV0FBVztvQkFDWDt3QkFDQyxPQUFPLEVBQUUsaUJBQWlCOzt3QkFFMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx3QkFBd0IsRUFBQzt3QkFDdkQsS0FBSyxFQUFFLElBQUk7cUJBQ1g7b0JBQ0Q7d0JBQ0MsT0FBTyxFQUFFLGFBQWE7d0JBQ3RCLFFBQVEsSUFBc0I7d0JBQzlCLEtBQUssRUFBRSxJQUFJO3FCQUNYO2lCQUNEOzthQUNEOzs7O1lBMUJRLFdBQVc7OztvQkE2QmxCLEtBQUs7aUNBQ0wsS0FBSztnQ0FDTCxLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztzQ0FDTCxLQUFLO2dDQUNMLEtBQUs7aUNBQ0wsS0FBSzt1Q0FDTCxLQUFLO3dCQUNMLEtBQUs7MkJBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBQ0wsS0FBSztpQkFDTCxLQUFLO3NDQUNMLEtBQUs7Z0NBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUVMLE1BQU07b0JBQ04sTUFBTTsrQkFhTixLQUFLOzBCQVlMLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzs7O0lBN0MzQyx5Q0FBb0I7O0lBQ3BCLHNEQUFnRDs7SUFDaEQscURBQWtDOztJQUNsQyw0Q0FBbUM7O0lBQ25DLGlEQUEyQzs7SUFDM0MsMkRBQXdDOztJQUN4QyxxREFBbUM7O0lBQ25DLHNEQUE2RTs7SUFDN0UsNERBQXFEOztJQUNyRCw2Q0FBd0I7O0lBQ3hCLGdEQUFvQzs7SUFDcEMsc0RBQW1DOztJQUNuQyxzREFBd0M7O0lBQ3hDLG1EQUFnQzs7SUFDaEMsc0NBQXNCOztJQUN0QiwyREFBeUM7O0lBQ3pDLHFEQUE0Qzs7SUFDNUMsNENBQTBCOztJQUUxQixpREFBK0Q7O0lBQy9ELHlDQUFtRDs7SUFFbkQsbURBUUU7O0lBR0Ysb0RBQWtDOztJQUNsQyx5REFBOEI7O0lBRTlCLCtDQUFpQjs7SUFDakIsZ0RBQWtDOztJQUNsQyxnRUFBa0Q7O0lBRWxELDZDQUFtRDs7SUFDbkQsNENBQWlCOztJQUNqQiwwQ0FBbUQ7O0lBQ25ELHFEQUF1Qjs7SUFFdkIsK0NBQXFFOztJQUVyRSw2Q0FBc0I7O0lBQ3RCLG1EQUFrQzs7Ozs7SUFHakMsbURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIGZvcndhcmRSZWYsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IENvdW50cnlDb2RlIH0gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XHJcbmltcG9ydCB7IHBob25lTnVtYmVyVmFsaWRhdG9yIH0gZnJvbSAnLi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQ291bnRyeSB9IGZyb20gJy4vbW9kZWwvY291bnRyeS5tb2RlbCc7XHJcbmltcG9ydCAqIGFzIGxwbiBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xyXG5pbXBvcnQgeyBTZWFyY2hDb3VudHJ5RmllbGQgfSBmcm9tICcuL2VudW1zL3NlYXJjaC1jb3VudHJ5LWZpZWxkLmVudW0nO1xyXG5pbXBvcnQgeyBUb29sdGlwTGFiZWwgfSBmcm9tICcuL2VudW1zL3Rvb2x0aXAtbGFiZWwuZW51bSc7XHJcbmltcG9ydCB7IENvdW50cnlJU08gfSBmcm9tICcuL2VudW1zL2NvdW50cnktaXNvLmVudW0nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICduZ3gtaW50bC10ZWwtaW5wdXQnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuY3NzJ10sXHJcblx0cHJvdmlkZXJzOiBbXHJcblx0XHRDb3VudHJ5Q29kZSxcclxuXHRcdHtcclxuXHRcdFx0cHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcblx0XHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3J3YXJkLXJlZlxyXG5cdFx0XHR1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQpLFxyXG5cdFx0XHRtdWx0aTogdHJ1ZVxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFx0cHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuXHRcdFx0dXNlVmFsdWU6IHBob25lTnVtYmVyVmFsaWRhdG9yLFxyXG5cdFx0XHRtdWx0aTogdHJ1ZSxcclxuXHRcdH1cclxuXHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG5cdEBJbnB1dCgpIHZhbHVlID0gJyc7XHJcblx0QElucHV0KCkgcHJlZmVycmVkQ291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0QElucHV0KCkgZW5hYmxlUGxhY2Vob2xkZXIgPSB0cnVlO1xyXG5cdEBJbnB1dCgpIGNzc0NsYXNzID0gJ2Zvcm0tY29udHJvbCc7XHJcblx0QElucHV0KCkgb25seUNvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdEBJbnB1dCgpIGVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0ID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5RmxhZyA9IGZhbHNlO1xyXG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlGaWVsZDogU2VhcmNoQ291bnRyeUZpZWxkW10gPSBbU2VhcmNoQ291bnRyeUZpZWxkLkFsbF07XHJcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeVBsYWNlaG9sZGVyID0gJ1NlYXJjaCBDb3VudHJ5JztcclxuXHRASW5wdXQoKSBtYXhMZW5ndGggPSAnJztcclxuXHRASW5wdXQoKSB0b29sdGlwRmllbGQ6IFRvb2x0aXBMYWJlbDtcclxuXHRASW5wdXQoKSBzZWxlY3RGaXJzdENvdW50cnkgPSB0cnVlO1xyXG5cdEBJbnB1dCgpIHNlbGVjdGVkQ291bnRyeUlTTzogQ291bnRyeUlTTztcclxuXHRASW5wdXQoKSBwaG9uZVZhbGlkYXRpb24gPSB0cnVlO1xyXG5cdEBJbnB1dCgpIGlkID0gJ3Bob25lJztcclxuXHRASW5wdXQoKSBlbmFibGVDdXN0b21QbGFjZWhvbGRlciA9IGZhbHNlO1xyXG5cdEBJbnB1dCgpIGN1c3RvbVBsYWNlaG9sZGVyID0gJ1Bob25lIE51bWJlcic7XHJcblx0QElucHV0KCkgcmVhZE9ubHkgPSBmYWxzZTtcclxuXHJcblx0QE91dHB1dCgpIHJlYWRvbmx5IGNvdW50cnlDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENvdW50cnk+KCk7XHJcblx0QE91dHB1dCgpIHJlYWRvbmx5IGVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG5cdHNlbGVjdGVkQ291bnRyeTogQ291bnRyeSA9IHtcclxuXHRcdGFyZWFDb2RlczogdW5kZWZpbmVkLFxyXG5cdFx0ZGlhbENvZGU6ICcnLFxyXG5cdFx0ZmxhZ0NsYXNzOiAnJyxcclxuXHRcdGlzbzI6ICcnLFxyXG5cdFx0bmFtZTogJycsXHJcblx0XHRwbGFjZUhvbGRlcjogJycsXHJcblx0XHRwcmlvcml0eTogMFxyXG5cdH07XHJcblxyXG5cdC8vIGRpc3BsYXkgdGhlIGNvdW50cnkgZGlhbCBjb2RlIG5leHQgdG8gdGhlIHNlbGVjdGVkIGZsYWdcclxuXHRASW5wdXQoKSBzZXBhcmF0ZURpYWxDb2RlID0gZmFsc2U7XHJcblx0c2VwYXJhdGVEaWFsQ29kZUNsYXNzOiBzdHJpbmc7XHJcblxyXG5cdHBob25lTnVtYmVyID0gJyc7XHJcblx0YWxsQ291bnRyaWVzOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xyXG5cdHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XHJcblx0Ly8gSGFzIHRvIGJlICdhbnknIHRvIHByZXZlbnQgYSBuZWVkIHRvIGluc3RhbGwgQHR5cGVzL2dvb2dsZS1saWJwaG9uZW51bWJlciBieSB0aGUgcGFja2FnZSB1c2VyLi4uXHJcblx0cGhvbmVVdGlsOiBhbnkgPSBscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XHJcblx0ZGlzYWJsZWQgPSBmYWxzZTtcclxuXHRlcnJvcnM6IEFycmF5PGFueT4gPSBbJ1Bob25lIG51bWJlciBpcyByZXF1aXJlZC4nXTtcclxuXHRjb3VudHJ5U2VhcmNoVGV4dCA9ICcnO1xyXG5cclxuXHRAVmlld0NoaWxkKCdjb3VudHJ5TGlzdCcsIHsgc3RhdGljOiBmYWxzZSB9KSBjb3VudHJ5TGlzdDogRWxlbWVudFJlZjtcclxuXHJcblx0b25Ub3VjaGVkID0gKCkgPT4geyB9O1xyXG5cdHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGVcclxuXHQpIHsgfVxyXG5cclxuXHRuZ09uSW5pdCgpIHtcclxuXHRcdHRoaXMuaW5pdCgpO1xyXG5cdH1cclxuXHJcblx0bmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG5cdFx0aWYgKHRoaXMuYWxsQ291bnRyaWVzICYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddXHJcblx0XHRcdCYmIGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ10ucHJldmlvdXNWYWx1ZSkge1xyXG5cdFx0XHR0aGlzLmdldFNlbGVjdGVkQ291bnRyeSgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNoYW5nZXMucHJlZmVycmVkQ291bnRyaWVzKSB7XHJcblx0XHRcdHRoaXMuZ2V0UHJlZmVycmVkQ291bnRyaWVzKCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblx0fVxyXG5cclxuXHQvKlxyXG5cdFx0VGhpcyBpcyBhIHdyYXBwZXIgbWV0aG9kIHRvIGF2b2lkIGNhbGxpbmcgdGhpcy5uZ09uSW5pdCgpIGluIHdyaXRlVmFsdWUoKS5cclxuXHRcdFJlZjogaHR0cDovL2NvZGVseXplci5jb20vcnVsZXMvbm8tbGlmZS1jeWNsZS1jYWxsL1xyXG5cdCovXHJcblx0aW5pdCgpIHtcclxuXHRcdHRoaXMuZmV0Y2hDb3VudHJ5RGF0YSgpO1xyXG5cdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLmdldFByZWZlcnJlZENvdW50cmllcygpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub25seUNvdW50cmllcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5hbGxDb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB0aGlzLm9ubHlDb3VudHJpZXMuaW5jbHVkZXMoYy5pc28yKSk7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpcy5zZWxlY3RGaXJzdENvdW50cnkpIHtcclxuXHRcdFx0aWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2V0U2VsZWN0ZWRDb3VudHJ5KHRoaXMuYWxsQ291bnRyaWVzWzBdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcclxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHR9XHJcblxyXG5cdGdldFByZWZlcnJlZENvdW50cmllcygpIHtcclxuXHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duID0gW107XHJcblx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmZvckVhY2goaXNvMiA9PiB7XHJcblx0XHRcdFx0Y29uc3QgcHJlZmVycmVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcigoYykgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGMuaXNvMiA9PT0gaXNvMjtcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duLnB1c2gocHJlZmVycmVkQ291bnRyeVswXSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0U2VsZWN0ZWRDb3VudHJ5KCkge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmluZChjID0+IHsgcmV0dXJuIChjLmlzbzIudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5zZWxlY3RlZENvdW50cnlJU08udG9Mb3dlckNhc2UoKSk7IH0pO1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3RlZENvdW50cnkpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5waG9uZU51bWJlcikge1xyXG5cdFx0XHRcdFx0dGhpcy5vblBob25lTnVtYmVyQ2hhbmdlKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHVuZGVmaW5lZCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXRTZWxlY3RlZENvdW50cnkoY291bnRyeTogQ291bnRyeSkge1xyXG5cdFx0dGhpcy5zZWxlY3RlZENvdW50cnkgPSBjb3VudHJ5O1xyXG5cdFx0dGhpcy5jb3VudHJ5Q2hhbmdlLmVtaXQoY291bnRyeSk7XHJcblx0fVxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogU2VhcmNoIGNvdW50cnkgYmFzZWQgb24gY291bnRyeSBuYW1lLCBpc28yLCBkaWFsQ29kZSBvciBhbGwgb2YgdGhlbS5cclxuXHQgKi9cclxuXHRzZWFyY2hDb3VudHJ5KCkge1xyXG5cdFx0aWYgKCF0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSB7XHJcblx0XHRcdHRoaXMuY291bnRyeUxpc3QubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY291bnRyeS1saXN0IGxpJykuc2Nyb2xsSW50b1ZpZXcoe1xyXG5cdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJyxcclxuXHRcdFx0XHRibG9jazogJ25lYXJlc3QnLFxyXG5cdFx0XHRcdGlubGluZTogJ25lYXJlc3QnXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRjb25zdCBjb3VudHJ5U2VhcmNoVGV4dExvd2VyID0gdGhpcy5jb3VudHJ5U2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0Y29uc3QgY291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcihjID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLkFsbCkgPiAtMSkge1xyXG5cdFx0XHRcdC8vIFNlYXJjaCBpbiBhbGwgZmllbGRzXHJcblx0XHRcdFx0aWYgKGMuaXNvMi50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYy5uYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChjLmRpYWxDb2RlLnN0YXJ0c1dpdGgodGhpcy5jb3VudHJ5U2VhcmNoVGV4dCkpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBPciBzZWFyY2ggYnkgc3BlY2lmaWMgU2VhcmNoQ291bnRyeUZpZWxkKHMpXHJcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLklzbzIpID4gLTEpIHtcclxuXHRcdFx0XHRcdGlmIChjLmlzbzIudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuTmFtZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5EaWFsQ29kZSkgPiAtMSkge1xyXG5cdFx0XHRcdFx0aWYgKGMuZGlhbENvZGUuc3RhcnRzV2l0aCh0aGlzLmNvdW50cnlTZWFyY2hUZXh0KSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdGlmIChjb3VudHJ5Lmxlbmd0aCA+IDApIHtcclxuXHRcdFx0Y29uc3QgZWwgPSB0aGlzLmNvdW50cnlMaXN0Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBjb3VudHJ5WzBdLmlzbzIpO1xyXG5cdFx0XHRpZiAoZWwpIHtcclxuXHRcdFx0XHRlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6ICduZWFyZXN0JywgaW5saW5lOiAnbmVhcmVzdCcgIH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG9uUGhvbmVOdW1iZXJDaGFuZ2UoKTogdm9pZCB7XHJcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcclxuXHJcblx0XHRsZXQgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXI7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRudW1iZXIgPSB0aGlzLnBob25lVXRpbC5wYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCBjb3VudHJ5Q29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XHJcblx0XHQvLyBhdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGFuZCBhcmVhQ29kZSBpZiBuZWVkZWQpIChlLmcgc2VsZWN0IENhbmFkYSBpZiBudW1iZXIgc3RhcnRzIHdpdGggKzEgNDE2KVxyXG5cdFx0aWYgKHRoaXMuZW5hYmxlQXV0b0NvdW50cnlTZWxlY3QpIHtcclxuXHRcdFx0Y291bnRyeUNvZGUgPSBudW1iZXIgJiYgbnVtYmVyLmdldENvdW50cnlDb2RlKClcclxuXHRcdFx0XHQ/IHRoaXMuZ2V0Q291bnRyeUlzb0NvZGUobnVtYmVyLmdldENvdW50cnlDb2RlKCksIG51bWJlcilcclxuXHRcdFx0XHQ6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XHJcblx0XHRcdGlmIChjb3VudHJ5Q29kZSAmJiBjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMikge1xyXG5cdFx0XHRcdGNvbnN0IG5ld0NvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZSk7XHJcblx0XHRcdFx0aWYgKG5ld0NvdW50cnkpIHtcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gbmV3Q291bnRyeTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGNvdW50cnlDb2RlID0gY291bnRyeUNvZGUgPyBjb3VudHJ5Q29kZSA6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzI7XHJcblxyXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG5cclxuXHRcdGlmICghdGhpcy52YWx1ZSkge1xyXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh1bmRlZmluZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29uc3QgaW50bE5vID0gbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpIDogJyc7XHJcblxyXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXHJcblx0XHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgaW50bE5vKSB7XHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMucmVtb3ZlRGlhbENvZGUoaW50bE5vKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2Uoe1xyXG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcclxuXHRcdFx0XHRpbnRlcm5hdGlvbmFsTnVtYmVyOiBpbnRsTm8sXHJcblx0XHRcdFx0bmF0aW9uYWxOdW1iZXI6IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCkgOiAnJyxcclxuXHRcdFx0XHRjb3VudHJ5Q29kZTogY291bnRyeUNvZGUudG9VcHBlckNhc2UoKSxcclxuXHRcdFx0XHRkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGUsXHJcblx0XHRcdFx0aWQ6IHRoaXMuaWRcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25Db3VudHJ5U2VsZWN0KGNvdW50cnk6IENvdW50cnksIGVsKTogdm9pZCB7XHJcblx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcclxuXHJcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIgJiYgdGhpcy5waG9uZU51bWJlci5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLnBob25lTnVtYmVyO1xyXG5cclxuXHRcdFx0bGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdG51bWJlciA9IHRoaXMucGhvbmVVdGlsLnBhcnNlKHRoaXMucGhvbmVOdW1iZXIsIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Y29uc3QgaW50bE5vID0gbnVtYmVyID8gdGhpcy5waG9uZVV0aWwuZm9ybWF0KG51bWJlciwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpIDogJyc7XHJcblxyXG5cdFx0XHQvLyBwYXJzZSBwaG9uZU51bWJlciBpZiBzZXBhcmF0ZSBkaWFsIGNvZGUgaXMgbmVlZGVkXHJcblx0XHRcdGlmICh0aGlzLnNlcGFyYXRlRGlhbENvZGUgJiYgaW50bE5vKSB7XHJcblx0XHRcdFx0dGhpcy52YWx1ZSA9IHRoaXMucmVtb3ZlRGlhbENvZGUoaW50bE5vKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2Uoe1xyXG5cdFx0XHRcdG51bWJlcjogdGhpcy52YWx1ZSxcclxuXHRcdFx0XHRpbnRlcm5hdGlvbmFsTnVtYmVyOiBpbnRsTm8sXHJcblx0XHRcdFx0bmF0aW9uYWxOdW1iZXI6IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCkgOiAnJyxcclxuXHRcdFx0XHRjb3VudHJ5Q29kZTogdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpLFxyXG5cdFx0XHRcdGRpYWxDb2RlOiAnKycgKyB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZSxcclxuXHRcdFx0XHRpZDogdGhpcy5pZFxyXG5cdFx0XHR9KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHVuZGVmaW5lZCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWwuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvbklucHV0S2V5UHJlc3MoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGFsbG93ZWRDaGFycyA9IC9bMC05XFwrXFwtXFwgXS87XHJcblx0XHRjb25zdCBhbGxvd2VkQ3RybENoYXJzID0gL1theGN2XS87IC8vIEFsbG93cyBjb3B5LXBhc3RpbmdcclxuXHRcdGNvbnN0IGFsbG93ZWRPdGhlcktleXMgPSBbXHJcblx0XHRcdCdBcnJvd0xlZnQnLCAnQXJyb3dVcCcsICdBcnJvd1JpZ2h0JywgJ0Fycm93RG93bicsXHJcblx0XHRcdCdIb21lJywgJ0VuZCcsICdJbnNlcnQnLCAnRGVsZXRlJywgJ0JhY2tzcGFjZSdcclxuXHRcdF07XHJcblxyXG5cdFx0aWYgKCFhbGxvd2VkQ2hhcnMudGVzdChldmVudC5rZXkpXHJcblx0XHRcdCYmICEoZXZlbnQuY3RybEtleSAmJiBhbGxvd2VkQ3RybENoYXJzLnRlc3QoZXZlbnQua2V5KSlcclxuXHRcdFx0JiYgIShhbGxvd2VkT3RoZXJLZXlzLmluY2x1ZGVzKGV2ZW50LmtleSkpKSB7XHJcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcclxuXHRcdC8qIENsZWFyaW5nIHRoZSBsaXN0IHRvIGF2b2lkIGR1cGxpY2F0ZXMgKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJjYXQxMjM0NS9uZ3gtaW50bC10ZWwtaW5wdXQvaXNzdWVzLzI0OCkgKi9cclxuXHRcdHRoaXMuYWxsQ291bnRyaWVzID0gW107XHJcblxyXG5cdFx0dGhpcy5jb3VudHJ5Q29kZURhdGEuYWxsQ291bnRyaWVzLmZvckVhY2goYyA9PiB7XHJcblx0XHRcdGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XHJcblx0XHRcdFx0bmFtZTogY1swXS50b1N0cmluZygpLFxyXG5cdFx0XHRcdGlzbzI6IGNbMV0udG9TdHJpbmcoKSxcclxuXHRcdFx0XHRkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxyXG5cdFx0XHRcdHByaW9yaXR5OiArY1szXSB8fCAwLFxyXG5cdFx0XHRcdGFyZWFDb2RlczogY1s0XSBhcyBzdHJpbmdbXSB8fCB1bmRlZmluZWQsXHJcblx0XHRcdFx0ZmxhZ0NsYXNzOiBjWzFdLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKSxcclxuXHRcdFx0XHRwbGFjZUhvbGRlcjogJydcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICh0aGlzLmVuYWJsZVBsYWNlaG9sZGVyKSB7XHJcblx0XHRcdFx0Y291bnRyeS5wbGFjZUhvbGRlciA9IHRoaXMuZ2V0UGhvbmVOdW1iZXJQbGFjZUhvbGRlcihjb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWxsQ291bnRyaWVzLnB1c2goY291bnRyeSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBnZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKGNvdW50cnlDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0cmV0dXJuIHRoaXMucGhvbmVVdGlsLmZvcm1hdCh0aGlzLnBob25lVXRpbC5nZXRFeGFtcGxlTnVtYmVyKGNvdW50cnlDb2RlKSwgbHBuLlBob25lTnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUwpO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRyZXR1cm4gZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG5cdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuXHR9XHJcblxyXG5cdHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuXHRcdHRoaXMub25Ub3VjaGVkID0gZm47XHJcblx0fVxyXG5cclxuXHRzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG5cdH1cclxuXHJcblx0d3JpdGVWYWx1ZShvYmo6IGFueSk6IHZvaWQge1xyXG5cdFx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuaW5pdCgpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5waG9uZU51bWJlciA9IG9iajtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHR0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcclxuXHRcdH0sIDEpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRDb3VudHJ5SXNvQ29kZShjb3VudHJ5Q29kZTogbnVtYmVyLCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcblx0XHQvLyBXaWxsIHVzZSB0aGlzIHRvIG1hdGNoIGFyZWEgY29kZSBmcm9tIHRoZSBmaXJzdCBudW1iZXJzXHJcblx0XHRjb25zdCByYXdOdW1iZXIgPSBudW1iZXJbJ3ZhbHVlc18nXVsnMiddLnRvU3RyaW5nKCk7XHJcblx0XHQvLyBMaXN0IG9mIGFsbCBjb3VudHJpZXMgd2l0aCBjb3VudHJ5Q29kZSAoY2FuIGJlIG1vcmUgdGhhbiBvbmUuIGUueC4gVVMsIENBLCBETywgUFIgYWxsIGhhdmUgKzEgY291bnRyeUNvZGUpXHJcblx0XHRjb25zdCBjb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiBjLmRpYWxDb2RlID09PSBjb3VudHJ5Q29kZS50b1N0cmluZygpKTtcclxuXHRcdC8vIE1haW4gY291bnRyeSBpcyB0aGUgY291bnRyeSwgd2hpY2ggaGFzIG5vIGFyZWFDb2RlcyBzcGVjaWZpZWQgaW4gY291bnRyeS1jb2RlLnRzIGZpbGUuXHJcblx0XHRjb25zdCBtYWluQ291bnRyeSA9IGNvdW50cmllcy5maW5kKGMgPT4gYy5hcmVhQ29kZXMgPT09IHVuZGVmaW5lZCk7XHJcblx0XHQvLyBTZWNvbmRhcnkgY291bnRyaWVzIGFyZSBhbGwgY291bnRyaWVzLCB3aGljaCBoYXZlIGFyZWFDb2RlcyBzcGVjaWZpZWQgaW4gY291bnRyeS1jb2RlLnRzIGZpbGUuXHJcblx0XHRjb25zdCBzZWNvbmRhcnlDb3VudHJpZXMgPSBjb3VudHJpZXMuZmlsdGVyKGMgPT4gYy5hcmVhQ29kZXMgIT09IHVuZGVmaW5lZCk7XHJcblx0XHRsZXQgbWF0Y2hlZENvdW50cnkgPSBtYWluQ291bnRyeSA/IG1haW5Db3VudHJ5LmlzbzIgOiB1bmRlZmluZWQ7XHJcblxyXG5cdFx0LypcclxuXHRcdFx0SW50ZXJhdGUgb3ZlciBlYWNoIHNlY29uZGFyeSBjb3VudHJ5IGFuZCBjaGVjayBpZiBuYXRpb25hbE51bWJlciBzdGFydHMgd2l0aCBhbnkgb2YgYXJlYUNvZGVzIGF2YWlsYWJsZS5cclxuXHRcdFx0SWYgbm8gbWF0Y2hlcyBmb3VuZCwgZmFsbGJhY2sgdG8gdGhlIG1haW4gY291bnRyeS5cclxuXHRcdCovXHJcblx0XHRzZWNvbmRhcnlDb3VudHJpZXMuZm9yRWFjaChjb3VudHJ5ID0+IHtcclxuXHRcdFx0Y291bnRyeS5hcmVhQ29kZXMuZm9yRWFjaChhcmVhQ29kZSA9PiB7XHJcblx0XHRcdFx0aWYgKHJhd051bWJlci5zdGFydHNXaXRoKGFyZWFDb2RlKSkge1xyXG5cdFx0XHRcdFx0bWF0Y2hlZENvdW50cnkgPSBjb3VudHJ5LmlzbzI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiBtYXRjaGVkQ291bnRyeTtcclxuXHR9XHJcblxyXG5cdHNlcGFyYXRlRGlhbENvZGVQbGFjZUhvbGRlcihwbGFjZWhvbGRlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLnJlbW92ZURpYWxDb2RlKHBsYWNlaG9sZGVyKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlRGlhbENvZGUocGhvbmVOdW1iZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIHBob25lTnVtYmVyKSB7XHJcblx0XHRcdHBob25lTnVtYmVyID0gcGhvbmVOdW1iZXIuc3Vic3RyKHBob25lTnVtYmVyLmluZGV4T2YoJyAnKSArIDEpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHBob25lTnVtYmVyO1xyXG5cdH1cclxuXHJcblx0Ly8gYWRqdXN0IGlucHV0IGFsaWdubWVudFxyXG5cdHByaXZhdGUgY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKSB7XHJcblx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XHJcblx0XHRcdGNvbnN0IGNudHJ5Q2QgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5kaWFsQ29kZTtcclxuXHRcdFx0dGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPSAnc2VwYXJhdGUtZGlhbC1jb2RlIGl0aS1zZGMtJyArIChjbnRyeUNkLmxlbmd0aCArIDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zZXBhcmF0ZURpYWxDb2RlQ2xhc3MgPSAnJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG59XHJcbiJdfQ==