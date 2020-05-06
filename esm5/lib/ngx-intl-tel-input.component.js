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
var ɵ0 = phoneNumberValidator;
var NgxIntlTelInputComponent = /** @class */ (function () {
    function NgxIntlTelInputComponent(countryCodeData) {
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
        function () { });
        this.propagateChange = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
    }
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.init();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.allCountries && changes['selectedCountryISO']
            && changes['selectedCountryISO'].currentValue !== changes['selectedCountryISO'].previousValue) {
            this.getSelectedCountry();
        }
        if (changes.preferredCountries) {
            this.getPreferredCountries();
        }
        this.checkSeparateDialCodeStyle();
    };
    /*
        This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
        Ref: http://codelyzer.com/rules/no-life-cycle-call/
    */
    /*
            This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
            Ref: http://codelyzer.com/rules/no-life-cycle-call/
        */
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.init = /*
            This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
            Ref: http://codelyzer.com/rules/no-life-cycle-call/
        */
    /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.fetchCountryData();
        if (this.preferredCountries.length) {
            this.getPreferredCountries();
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return _this.onlyCountries.includes(c.iso2); }));
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
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getPreferredCountries = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.preferredCountries.length) {
            this.preferredCountriesInDropDown = [];
            this.preferredCountries.forEach((/**
             * @param {?} iso2
             * @return {?}
             */
            function (iso2) {
                /** @type {?} */
                var preferredCountry = _this.allCountries.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) {
                    return c.iso2 === iso2;
                }));
                _this.preferredCountriesInDropDown.push(preferredCountry[0]);
            }));
        }
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getSelectedCountry = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selectedCountryISO) {
            this.selectedCountry = this.allCountries.find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return (c.iso2.toLowerCase() === _this.selectedCountryISO.toLowerCase()); }));
            if (this.selectedCountry) {
                if (this.phoneNumber) {
                    this.onPhoneNumberChange();
                }
                else {
                    this.propagateChange(undefined);
                }
            }
        }
    };
    /**
     * @param {?} country
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.setSelectedCountry = /**
     * @param {?} country
     * @return {?}
     */
    function (country) {
        this.selectedCountry = country;
        this.countryChange.emit(country);
    };
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     */
    /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.searchCountry = /**
     * Search country based on country name, iso2, dialCode or all of them.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.countrySearchText) {
            this.countryList.nativeElement.querySelector('.country-list li').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
            return;
        }
        /** @type {?} */
        var countrySearchTextLower = this.countrySearchText.toLowerCase();
        /** @type {?} */
        var country = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            if (_this.searchCountryField.indexOf(SearchCountryField.All) > -1) {
                // Search in all fields
                if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                    return c;
                }
                if (c.dialCode.startsWith(_this.countrySearchText)) {
                    return c;
                }
            }
            else {
                // Or search by specific SearchCountryField(s)
                if (_this.searchCountryField.indexOf(SearchCountryField.Iso2) > -1) {
                    if (c.iso2.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (_this.searchCountryField.indexOf(SearchCountryField.Name) > -1) {
                    if (c.name.toLowerCase().startsWith(countrySearchTextLower)) {
                        return c;
                    }
                }
                if (_this.searchCountryField.indexOf(SearchCountryField.DialCode) > -1) {
                    if (c.dialCode.startsWith(_this.countrySearchText)) {
                        return c;
                    }
                }
            }
        }));
        if (country.length > 0) {
            /** @type {?} */
            var el = this.countryList.nativeElement.querySelector('#' + country[0].iso2);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        }
        this.checkSeparateDialCodeStyle();
    };
    /**
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onPhoneNumberChange = /**
     * @return {?}
     */
    function () {
        this.value = this.phoneNumber;
        /** @type {?} */
        var number;
        try {
            number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
        }
        catch (e) {
        }
        /** @type {?} */
        var countryCode = this.selectedCountry.iso2;
        // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            countryCode = number && number.getCountryCode()
                ? this.getCountryIsoCode(number.getCountryCode(), number)
                : this.selectedCountry.iso2;
            if (countryCode && countryCode !== this.selectedCountry.iso2) {
                /** @type {?} */
                var newCountry = this.allCountries.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.iso2 === countryCode; }));
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
            var intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
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
    };
    /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onCountrySelect = /**
     * @param {?} country
     * @param {?} el
     * @return {?}
     */
    function (country, el) {
        this.setSelectedCountry(country);
        this.checkSeparateDialCodeStyle();
        if (this.phoneNumber && this.phoneNumber.length > 0) {
            this.value = this.phoneNumber;
            /** @type {?} */
            var number = void 0;
            try {
                number = this.phoneUtil.parse(this.phoneNumber, this.selectedCountry.iso2.toUpperCase());
            }
            catch (e) {
            }
            /** @type {?} */
            var intlNo = number ? this.phoneUtil.format(number, lpn.PhoneNumberFormat.INTERNATIONAL) : '';
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.onInputKeyPress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var allowedChars = /[0-9\+\-\ ]/;
        /** @type {?} */
        var allowedCtrlChars = /[axcv]/;
        // Allows copy-pasting
        /** @type {?} */
        var allowedOtherKeys = [
            'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown',
            'Home', 'End', 'Insert', 'Delete', 'Backspace'
        ];
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !(allowedOtherKeys.includes(event.key))) {
            event.preventDefault();
        }
    };
    /**
     * @protected
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.fetchCountryData = /**
     * @protected
     * @return {?}
     */
    function () {
        var _this = this;
        /* Clearing the list to avoid duplicates (https://github.com/webcat12345/ngx-intl-tel-input/issues/248) */
        this.allCountries = [];
        this.countryCodeData.allCountries.forEach((/**
         * @param {?} c
         * @return {?}
         */
        function (c) {
            /** @type {?} */
            var country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: (/** @type {?} */ (c[4])) || undefined,
                flagClass: c[1].toString().toLocaleLowerCase(),
                placeHolder: ''
            };
            if (_this.enablePlaceholder) {
                country.placeHolder = _this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            _this.allCountries.push(country);
        }));
    };
    /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getPhoneNumberPlaceHolder = /**
     * @protected
     * @param {?} countryCode
     * @return {?}
     */
    function (countryCode) {
        try {
            return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), lpn.PhoneNumberFormat.INTERNATIONAL);
        }
        catch (e) {
            return e;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.propagateChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.writeValue = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        var _this = this;
        if (obj === undefined) {
            this.init();
        }
        this.phoneNumber = obj;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.onPhoneNumberChange();
        }), 1);
    };
    /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.getCountryIsoCode = /**
     * @private
     * @param {?} countryCode
     * @param {?} number
     * @return {?}
     */
    function (countryCode, number) {
        // Will use this to match area code from the first numbers
        /** @type {?} */
        var rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        /** @type {?} */
        var countries = this.allCountries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.dialCode === countryCode.toString(); }));
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        /** @type {?} */
        var mainCountry = countries.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.areaCodes === undefined; }));
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        /** @type {?} */
        var secondaryCountries = countries.filter((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.areaCodes !== undefined; }));
        /** @type {?} */
        var matchedCountry = mainCountry ? mainCountry.iso2 : undefined;
        /*
            Interate over each secondary country and check if nationalNumber starts with any of areaCodes available.
            If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((/**
         * @param {?} country
         * @return {?}
         */
        function (country) {
            country.areaCodes.forEach((/**
             * @param {?} areaCode
             * @return {?}
             */
            function (areaCode) {
                if (rawNumber.startsWith(areaCode)) {
                    matchedCountry = country.iso2;
                }
            }));
        }));
        return matchedCountry;
    };
    /**
     * @param {?} placeholder
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.separateDialCodePlaceHolder = /**
     * @param {?} placeholder
     * @return {?}
     */
    function (placeholder) {
        return this.removeDialCode(placeholder);
    };
    /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.removeDialCode = /**
     * @private
     * @param {?} phoneNumber
     * @return {?}
     */
    function (phoneNumber) {
        if (this.separateDialCode && phoneNumber) {
            phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
        }
        return phoneNumber;
    };
    // adjust input alignment
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    NgxIntlTelInputComponent.prototype.checkSeparateDialCodeStyle = 
    // adjust input alignment
    /**
     * @private
     * @return {?}
     */
    function () {
        if (this.separateDialCode && this.selectedCountry) {
            /** @type {?} */
            var cntryCd = this.selectedCountry.dialCode;
            this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
        }
        else {
            this.separateDialCodeClass = '';
        }
    };
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
                            function () { return NgxIntlTelInputComponent; })),
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
    NgxIntlTelInputComponent.ctorParameters = function () { return [
        { type: CountryCode }
    ]; };
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
    return NgxIntlTelInputComponent;
}());
export { NgxIntlTelInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBNEIsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1SSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXRFLE9BQU8sS0FBSyxHQUFHLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztTQWdCekMsb0JBQW9CO0FBZGpDO0lBdUVDLGtDQUNTLGVBQTRCO1FBQTVCLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBbkQ1QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsdUJBQWtCLEdBQWtCLEVBQUUsQ0FBQztRQUN2QyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFHLGNBQWMsQ0FBQztRQUMxQixrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsNEJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLHNCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMxQix1QkFBa0IsR0FBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwRSw2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QUFLO3FDQUNMLEtBQUs7b0NBQ0wsS0FBSzsyQkFDTCxLQUFLO2dDQUNMLEtBQUs7MENBQ0wsS0FBSztvQ0FDTCxLQUFLO3FDQUNMLEtBQUs7MkNBQ0wsS0FBSzs0QkFDTCxLQUFLOytCQUNMLEtBQUs7cUNBQ0wsS0FBSztxQ0FDTCxLQUFLO2tDQUNMLEtBQUs7cUJBQ0wsS0FBSzswQ0FDTCxLQUFLO29DQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FFTCxNQUFNO3dCQUNOLE1BQU07bUNBYU4sS0FBSzs4QkFZTCxTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUE0VTVDLCtCQUFDO0NBQUEsQUE5WUQsSUE4WUM7U0EzWFksd0JBQXdCOzs7SUFFcEMseUNBQW9COztJQUNwQixzREFBZ0Q7O0lBQ2hELHFEQUFrQzs7SUFDbEMsNENBQW1DOztJQUNuQyxpREFBMkM7O0lBQzNDLDJEQUF3Qzs7SUFDeEMscURBQW1DOztJQUNuQyxzREFBNkU7O0lBQzdFLDREQUFxRDs7SUFDckQsNkNBQXdCOztJQUN4QixnREFBb0M7O0lBQ3BDLHNEQUFtQzs7SUFDbkMsc0RBQXdDOztJQUN4QyxtREFBZ0M7O0lBQ2hDLHNDQUFzQjs7SUFDdEIsMkRBQXlDOztJQUN6QyxxREFBNEM7O0lBQzVDLDRDQUEwQjs7SUFFMUIsaURBQStEOztJQUMvRCx5Q0FBbUQ7O0lBRW5ELG1EQVFFOztJQUdGLG9EQUFrQzs7SUFDbEMseURBQThCOztJQUU5QiwrQ0FBaUI7O0lBQ2pCLGdEQUFrQzs7SUFDbEMsZ0VBQWtEOztJQUVsRCw2Q0FBbUQ7O0lBQ25ELDRDQUFpQjs7SUFDakIsMENBQW1EOztJQUNuRCxxREFBdUI7O0lBRXZCLCtDQUFxRTs7SUFFckUsNkNBQXNCOztJQUN0QixtREFBa0M7Ozs7O0lBR2pDLG1EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBDb3VudHJ5Q29kZSB9IGZyb20gJy4vZGF0YS9jb3VudHJ5LWNvZGUnO1xyXG5pbXBvcnQgeyBwaG9uZU51bWJlclZhbGlkYXRvciB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IENvdW50cnkgfSBmcm9tICcuL21vZGVsL2NvdW50cnkubW9kZWwnO1xyXG5pbXBvcnQgKiBhcyBscG4gZnJvbSAnZ29vZ2xlLWxpYnBob25lbnVtYmVyJztcclxuaW1wb3J0IHsgU2VhcmNoQ291bnRyeUZpZWxkIH0gZnJvbSAnLi9lbnVtcy9zZWFyY2gtY291bnRyeS1maWVsZC5lbnVtJztcclxuaW1wb3J0IHsgVG9vbHRpcExhYmVsIH0gZnJvbSAnLi9lbnVtcy90b29sdGlwLWxhYmVsLmVudW0nO1xyXG5pbXBvcnQgeyBDb3VudHJ5SVNPIH0gZnJvbSAnLi9lbnVtcy9jb3VudHJ5LWlzby5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnbmd4LWludGwtdGVsLWlucHV0JyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vbmd4LWludGwtdGVsLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LmNzcyddLFxyXG5cdHByb3ZpZGVyczogW1xyXG5cdFx0Q291bnRyeUNvZGUsXHJcblx0XHR7XHJcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yd2FyZC1yZWZcclxuXHRcdFx0dXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmd4SW50bFRlbElucHV0Q29tcG9uZW50KSxcclxuXHRcdFx0bXVsdGk6IHRydWVcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcdHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcblx0XHRcdHVzZVZhbHVlOiBwaG9uZU51bWJlclZhbGlkYXRvcixcclxuXHRcdFx0bXVsdGk6IHRydWUsXHJcblx0XHR9XHJcblx0XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG5cclxuXHRASW5wdXQoKSB2YWx1ZSA9ICcnO1xyXG5cdEBJbnB1dCgpIHByZWZlcnJlZENvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdEBJbnB1dCgpIGVuYWJsZVBsYWNlaG9sZGVyID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBjc3NDbGFzcyA9ICdmb3JtLWNvbnRyb2wnO1xyXG5cdEBJbnB1dCgpIG9ubHlDb3VudHJpZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRASW5wdXQoKSBlbmFibGVBdXRvQ291bnRyeVNlbGVjdCA9IHRydWU7XHJcblx0QElucHV0KCkgc2VhcmNoQ291bnRyeUZsYWcgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBzZWFyY2hDb3VudHJ5RmllbGQ6IFNlYXJjaENvdW50cnlGaWVsZFtdID0gW1NlYXJjaENvdW50cnlGaWVsZC5BbGxdO1xyXG5cdEBJbnB1dCgpIHNlYXJjaENvdW50cnlQbGFjZWhvbGRlciA9ICdTZWFyY2ggQ291bnRyeSc7XHJcblx0QElucHV0KCkgbWF4TGVuZ3RoID0gJyc7XHJcblx0QElucHV0KCkgdG9vbHRpcEZpZWxkOiBUb29sdGlwTGFiZWw7XHJcblx0QElucHV0KCkgc2VsZWN0Rmlyc3RDb3VudHJ5ID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBzZWxlY3RlZENvdW50cnlJU086IENvdW50cnlJU087XHJcblx0QElucHV0KCkgcGhvbmVWYWxpZGF0aW9uID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBpZCA9ICdwaG9uZSc7XHJcblx0QElucHV0KCkgZW5hYmxlQ3VzdG9tUGxhY2Vob2xkZXIgPSBmYWxzZTtcclxuXHRASW5wdXQoKSBjdXN0b21QbGFjZWhvbGRlciA9ICdQaG9uZSBOdW1iZXInO1xyXG5cdEBJbnB1dCgpIHJlYWRPbmx5ID0gZmFsc2U7XHJcblxyXG5cdEBPdXRwdXQoKSByZWFkb25seSBjb3VudHJ5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb3VudHJ5PigpO1xyXG5cdEBPdXRwdXQoKSByZWFkb25seSBlbnRlciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuXHRzZWxlY3RlZENvdW50cnk6IENvdW50cnkgPSB7XHJcblx0XHRhcmVhQ29kZXM6IHVuZGVmaW5lZCxcclxuXHRcdGRpYWxDb2RlOiAnJyxcclxuXHRcdGZsYWdDbGFzczogJycsXHJcblx0XHRpc28yOiAnJyxcclxuXHRcdG5hbWU6ICcnLFxyXG5cdFx0cGxhY2VIb2xkZXI6ICcnLFxyXG5cdFx0cHJpb3JpdHk6IDBcclxuXHR9O1xyXG5cclxuXHQvLyBkaXNwbGF5IHRoZSBjb3VudHJ5IGRpYWwgY29kZSBuZXh0IHRvIHRoZSBzZWxlY3RlZCBmbGFnXHJcblx0QElucHV0KCkgc2VwYXJhdGVEaWFsQ29kZSA9IGZhbHNlO1xyXG5cdHNlcGFyYXRlRGlhbENvZGVDbGFzczogc3RyaW5nO1xyXG5cclxuXHRwaG9uZU51bWJlciA9ICcnO1xyXG5cdGFsbENvdW50cmllczogQXJyYXk8Q291bnRyeT4gPSBbXTtcclxuXHRwcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duOiBBcnJheTxDb3VudHJ5PiA9IFtdO1xyXG5cdC8vIEhhcyB0byBiZSAnYW55JyB0byBwcmV2ZW50IGEgbmVlZCB0byBpbnN0YWxsIEB0eXBlcy9nb29nbGUtbGlicGhvbmVudW1iZXIgYnkgdGhlIHBhY2thZ2UgdXNlci4uLlxyXG5cdHBob25lVXRpbDogYW55ID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpO1xyXG5cdGRpc2FibGVkID0gZmFsc2U7XHJcblx0ZXJyb3JzOiBBcnJheTxhbnk+ID0gWydQaG9uZSBudW1iZXIgaXMgcmVxdWlyZWQuJ107XHJcblx0Y291bnRyeVNlYXJjaFRleHQgPSAnJztcclxuXHJcblx0QFZpZXdDaGlsZCgnY291bnRyeUxpc3QnLCB7IHN0YXRpYzogZmFsc2UgfSkgY291bnRyeUxpc3Q6IEVsZW1lbnRSZWY7XHJcblxyXG5cdG9uVG91Y2hlZCA9ICgpID0+IHsgfTtcclxuXHRwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7IH07XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBjb3VudHJ5Q29kZURhdGE6IENvdW50cnlDb2RlXHJcblx0KSB7IH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLmluaXQoKTtcclxuXHR9XHJcblxyXG5cdG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuXHRcdGlmICh0aGlzLmFsbENvdW50cmllcyAmJiBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXVxyXG5cdFx0XHQmJiBjaGFuZ2VzWydzZWxlY3RlZENvdW50cnlJU08nXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddLnByZXZpb3VzVmFsdWUpIHtcclxuXHRcdFx0dGhpcy5nZXRTZWxlY3RlZENvdW50cnkoKTtcclxuXHRcdH1cclxuXHRcdGlmIChjaGFuZ2VzLnByZWZlcnJlZENvdW50cmllcykge1xyXG5cdFx0XHR0aGlzLmdldFByZWZlcnJlZENvdW50cmllcygpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG5cdH1cclxuXHJcblx0LypcclxuXHRcdFRoaXMgaXMgYSB3cmFwcGVyIG1ldGhvZCB0byBhdm9pZCBjYWxsaW5nIHRoaXMubmdPbkluaXQoKSBpbiB3cml0ZVZhbHVlKCkuXHJcblx0XHRSZWY6IGh0dHA6Ly9jb2RlbHl6ZXIuY29tL3J1bGVzL25vLWxpZmUtY3ljbGUtY2FsbC9cclxuXHQqL1xyXG5cdGluaXQoKSB7XHJcblx0XHR0aGlzLmZldGNoQ291bnRyeURhdGEoKTtcclxuXHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllcy5sZW5ndGgpIHtcclxuXHRcdFx0dGhpcy5nZXRQcmVmZXJyZWRDb3VudHJpZXMoKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9ubHlDb3VudHJpZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMuYWxsQ291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4gdGhpcy5vbmx5Q291bnRyaWVzLmluY2x1ZGVzKGMuaXNvMikpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMuc2VsZWN0Rmlyc3RDb3VudHJ5KSB7XHJcblx0XHRcdGlmICh0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5wcmVmZXJyZWRDb3VudHJpZXNJbkRyb3BEb3duWzBdKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNldFNlbGVjdGVkQ291bnRyeSh0aGlzLmFsbENvdW50cmllc1swXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZ2V0U2VsZWN0ZWRDb3VudHJ5KCk7XHJcblx0XHR0aGlzLmNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCk7XHJcblx0fVxyXG5cclxuXHRnZXRQcmVmZXJyZWRDb3VudHJpZXMoKSB7XHJcblx0XHRpZiAodGhpcy5wcmVmZXJyZWRDb3VudHJpZXMubGVuZ3RoKSB7XHJcblx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93biA9IFtdO1xyXG5cdFx0XHR0aGlzLnByZWZlcnJlZENvdW50cmllcy5mb3JFYWNoKGlzbzIgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IHByZWZlcnJlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoKGMpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBjLmlzbzIgPT09IGlzbzI7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5wdXNoKHByZWZlcnJlZENvdW50cnlbMF0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldFNlbGVjdGVkQ291bnRyeSgpIHtcclxuXHRcdGlmICh0aGlzLnNlbGVjdGVkQ291bnRyeUlTTykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiB7IHJldHVybiAoYy5pc28yLnRvTG93ZXJDYXNlKCkgPT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPLnRvTG93ZXJDYXNlKCkpOyB9KTtcclxuXHRcdFx0aWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJ5KSB7XHJcblx0XHRcdFx0aWYgKHRoaXMucGhvbmVOdW1iZXIpIHtcclxuXHRcdFx0XHRcdHRoaXMub25QaG9uZU51bWJlckNoYW5nZSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c2V0U2VsZWN0ZWRDb3VudHJ5KGNvdW50cnk6IENvdW50cnkpIHtcclxuXHRcdHRoaXMuc2VsZWN0ZWRDb3VudHJ5ID0gY291bnRyeTtcclxuXHRcdHRoaXMuY291bnRyeUNoYW5nZS5lbWl0KGNvdW50cnkpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlYXJjaCBjb3VudHJ5IGJhc2VkIG9uIGNvdW50cnkgbmFtZSwgaXNvMiwgZGlhbENvZGUgb3IgYWxsIG9mIHRoZW0uXHJcblx0ICovXHJcblx0c2VhcmNoQ291bnRyeSgpIHtcclxuXHRcdGlmICghdGhpcy5jb3VudHJ5U2VhcmNoVGV4dCkge1xyXG5cdFx0XHR0aGlzLmNvdW50cnlMaXN0Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvdW50cnktbGlzdCBsaScpLnNjcm9sbEludG9WaWV3KHtcclxuXHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCcsXHJcblx0XHRcdFx0YmxvY2s6ICduZWFyZXN0JyxcclxuXHRcdFx0XHRpbmxpbmU6ICduZWFyZXN0J1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Y29uc3QgY291bnRyeVNlYXJjaFRleHRMb3dlciA9IHRoaXMuY291bnRyeVNlYXJjaFRleHQudG9Mb3dlckNhc2UoKTtcclxuXHRcdGNvbnN0IGNvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB7XHJcblx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5BbGwpID4gLTEpIHtcclxuXHRcdFx0XHQvLyBTZWFyY2ggaW4gYWxsIGZpZWxkc1xyXG5cdFx0XHRcdGlmIChjLmlzbzIudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGMubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoY291bnRyeVNlYXJjaFRleHRMb3dlcikpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoYy5kaWFsQ29kZS5zdGFydHNXaXRoKHRoaXMuY291bnRyeVNlYXJjaFRleHQpKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gT3Igc2VhcmNoIGJ5IHNwZWNpZmljIFNlYXJjaENvdW50cnlGaWVsZChzKVxyXG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaENvdW50cnlGaWVsZC5pbmRleE9mKFNlYXJjaENvdW50cnlGaWVsZC5Jc28yKSA+IC0xKSB7XHJcblx0XHRcdFx0XHRpZiAoYy5pc28yLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChjb3VudHJ5U2VhcmNoVGV4dExvd2VyKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gYztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQ291bnRyeUZpZWxkLmluZGV4T2YoU2VhcmNoQ291bnRyeUZpZWxkLk5hbWUpID4gLTEpIHtcclxuXHRcdFx0XHRcdGlmIChjLm5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKGNvdW50cnlTZWFyY2hUZXh0TG93ZXIpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAodGhpcy5zZWFyY2hDb3VudHJ5RmllbGQuaW5kZXhPZihTZWFyY2hDb3VudHJ5RmllbGQuRGlhbENvZGUpID4gLTEpIHtcclxuXHRcdFx0XHRcdGlmIChjLmRpYWxDb2RlLnN0YXJ0c1dpdGgodGhpcy5jb3VudHJ5U2VhcmNoVGV4dCkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGM7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAoY291bnRyeS5sZW5ndGggPiAwKSB7XHJcblx0XHRcdGNvbnN0IGVsID0gdGhpcy5jb3VudHJ5TGlzdC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY291bnRyeVswXS5pc28yKTtcclxuXHRcdFx0aWYgKGVsKSB7XHJcblx0XHRcdFx0ZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcsIGJsb2NrOiAnbmVhcmVzdCcsIGlubGluZTogJ25lYXJlc3QnICB9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBvblBob25lTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy52YWx1ZSA9IHRoaXMucGhvbmVOdW1iZXI7XHJcblxyXG5cdFx0bGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0bnVtYmVyID0gdGhpcy5waG9uZVV0aWwucGFyc2UodGhpcy5waG9uZU51bWJlciwgdGhpcy5zZWxlY3RlZENvdW50cnkuaXNvMi50b1VwcGVyQ2FzZSgpKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgY291bnRyeUNvZGUgPSB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG5cdFx0Ly8gYXV0byBzZWxlY3QgY291bnRyeSBiYXNlZCBvbiB0aGUgZXh0ZW5zaW9uIChhbmQgYXJlYUNvZGUgaWYgbmVlZGVkKSAoZS5nIHNlbGVjdCBDYW5hZGEgaWYgbnVtYmVyIHN0YXJ0cyB3aXRoICsxIDQxNilcclxuXHRcdGlmICh0aGlzLmVuYWJsZUF1dG9Db3VudHJ5U2VsZWN0KSB7XHJcblx0XHRcdGNvdW50cnlDb2RlID0gbnVtYmVyICYmIG51bWJlci5nZXRDb3VudHJ5Q29kZSgpXHJcblx0XHRcdFx0PyB0aGlzLmdldENvdW50cnlJc29Db2RlKG51bWJlci5nZXRDb3VudHJ5Q29kZSgpLCBudW1iZXIpXHJcblx0XHRcdFx0OiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG5cdFx0XHRpZiAoY291bnRyeUNvZGUgJiYgY291bnRyeUNvZGUgIT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIpIHtcclxuXHRcdFx0XHRjb25zdCBuZXdDb3VudHJ5ID0gdGhpcy5hbGxDb3VudHJpZXMuZmluZChjID0+IGMuaXNvMiA9PT0gY291bnRyeUNvZGUpO1xyXG5cdFx0XHRcdGlmIChuZXdDb3VudHJ5KSB7XHJcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkQ291bnRyeSA9IG5ld0NvdW50cnk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRjb3VudHJ5Q29kZSA9IGNvdW50cnlDb2RlID8gY291bnRyeUNvZGUgOiB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yO1xyXG5cclxuXHRcdHRoaXMuY2hlY2tTZXBhcmF0ZURpYWxDb2RlU3R5bGUoKTtcclxuXHJcblx0XHRpZiAoIXRoaXMudmFsdWUpIHtcclxuXHRcdFx0dGhpcy5wcm9wYWdhdGVDaGFuZ2UodW5kZWZpbmVkKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGNvbnN0IGludGxObyA9IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKSA6ICcnO1xyXG5cclxuXHRcdFx0Ly8gcGFyc2UgcGhvbmVOdW1iZXIgaWYgc2VwYXJhdGUgZGlhbCBjb2RlIGlzIG5lZWRlZFxyXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLnJlbW92ZURpYWxDb2RlKGludGxObyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcclxuXHRcdFx0XHRudW1iZXI6IHRoaXMudmFsdWUsXHJcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxyXG5cdFx0XHRcdG5hdGlvbmFsTnVtYmVyOiBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpIDogJycsXHJcblx0XHRcdFx0Y291bnRyeUNvZGU6IGNvdW50cnlDb2RlLnRvVXBwZXJDYXNlKCksXHJcblx0XHRcdFx0ZGlhbENvZGU6ICcrJyArIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlLFxyXG5cdFx0XHRcdGlkOiB0aGlzLmlkXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIG9uQ291bnRyeVNlbGVjdChjb3VudHJ5OiBDb3VudHJ5LCBlbCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zZXRTZWxlY3RlZENvdW50cnkoY291bnRyeSk7XHJcblxyXG5cdFx0dGhpcy5jaGVja1NlcGFyYXRlRGlhbENvZGVTdHlsZSgpO1xyXG5cclxuXHRcdGlmICh0aGlzLnBob25lTnVtYmVyICYmIHRoaXMucGhvbmVOdW1iZXIubGVuZ3RoID4gMCkge1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5waG9uZU51bWJlcjtcclxuXHJcblx0XHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRudW1iZXIgPSB0aGlzLnBob25lVXRpbC5wYXJzZSh0aGlzLnBob25lTnVtYmVyLCB0aGlzLnNlbGVjdGVkQ291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGNvbnN0IGludGxObyA9IG51bWJlciA/IHRoaXMucGhvbmVVdGlsLmZvcm1hdChudW1iZXIsIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKSA6ICcnO1xyXG5cclxuXHRcdFx0Ly8gcGFyc2UgcGhvbmVOdW1iZXIgaWYgc2VwYXJhdGUgZGlhbCBjb2RlIGlzIG5lZWRlZFxyXG5cdFx0XHRpZiAodGhpcy5zZXBhcmF0ZURpYWxDb2RlICYmIGludGxObykge1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLnJlbW92ZURpYWxDb2RlKGludGxObyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlKHtcclxuXHRcdFx0XHRudW1iZXI6IHRoaXMudmFsdWUsXHJcblx0XHRcdFx0aW50ZXJuYXRpb25hbE51bWJlcjogaW50bE5vLFxyXG5cdFx0XHRcdG5hdGlvbmFsTnVtYmVyOiBudW1iZXIgPyB0aGlzLnBob25lVXRpbC5mb3JtYXQobnVtYmVyLCBscG4uUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpIDogJycsXHJcblx0XHRcdFx0Y291bnRyeUNvZGU6IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmlzbzIudG9VcHBlckNhc2UoKSxcclxuXHRcdFx0XHRkaWFsQ29kZTogJysnICsgdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGUsXHJcblx0XHRcdFx0aWQ6IHRoaXMuaWRcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnByb3BhZ2F0ZUNoYW5nZSh1bmRlZmluZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGVsLmZvY3VzKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgb25JbnB1dEtleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcblx0XHRjb25zdCBhbGxvd2VkQ2hhcnMgPSAvWzAtOVxcK1xcLVxcIF0vO1xyXG5cdFx0Y29uc3QgYWxsb3dlZEN0cmxDaGFycyA9IC9bYXhjdl0vOyAvLyBBbGxvd3MgY29weS1wYXN0aW5nXHJcblx0XHRjb25zdCBhbGxvd2VkT3RoZXJLZXlzID0gW1xyXG5cdFx0XHQnQXJyb3dMZWZ0JywgJ0Fycm93VXAnLCAnQXJyb3dSaWdodCcsICdBcnJvd0Rvd24nLFxyXG5cdFx0XHQnSG9tZScsICdFbmQnLCAnSW5zZXJ0JywgJ0RlbGV0ZScsICdCYWNrc3BhY2UnXHJcblx0XHRdO1xyXG5cclxuXHRcdGlmICghYWxsb3dlZENoYXJzLnRlc3QoZXZlbnQua2V5KVxyXG5cdFx0XHQmJiAhKGV2ZW50LmN0cmxLZXkgJiYgYWxsb3dlZEN0cmxDaGFycy50ZXN0KGV2ZW50LmtleSkpXHJcblx0XHRcdCYmICEoYWxsb3dlZE90aGVyS2V5cy5pbmNsdWRlcyhldmVudC5rZXkpKSkge1xyXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGZldGNoQ291bnRyeURhdGEoKTogdm9pZCB7XHJcblx0XHQvKiBDbGVhcmluZyB0aGUgbGlzdCB0byBhdm9pZCBkdXBsaWNhdGVzIChodHRwczovL2dpdGh1Yi5jb20vd2ViY2F0MTIzNDUvbmd4LWludGwtdGVsLWlucHV0L2lzc3Vlcy8yNDgpICovXHJcblx0XHR0aGlzLmFsbENvdW50cmllcyA9IFtdO1xyXG5cclxuXHRcdHRoaXMuY291bnRyeUNvZGVEYXRhLmFsbENvdW50cmllcy5mb3JFYWNoKGMgPT4ge1xyXG5cdFx0XHRjb25zdCBjb3VudHJ5OiBDb3VudHJ5ID0ge1xyXG5cdFx0XHRcdG5hbWU6IGNbMF0udG9TdHJpbmcoKSxcclxuXHRcdFx0XHRpc28yOiBjWzFdLnRvU3RyaW5nKCksXHJcblx0XHRcdFx0ZGlhbENvZGU6IGNbMl0udG9TdHJpbmcoKSxcclxuXHRcdFx0XHRwcmlvcml0eTogK2NbM10gfHwgMCxcclxuXHRcdFx0XHRhcmVhQ29kZXM6IGNbNF0gYXMgc3RyaW5nW10gfHwgdW5kZWZpbmVkLFxyXG5cdFx0XHRcdGZsYWdDbGFzczogY1sxXS50b1N0cmluZygpLnRvTG9jYWxlTG93ZXJDYXNlKCksXHJcblx0XHRcdFx0cGxhY2VIb2xkZXI6ICcnXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAodGhpcy5lbmFibGVQbGFjZWhvbGRlcikge1xyXG5cdFx0XHRcdGNvdW50cnkucGxhY2VIb2xkZXIgPSB0aGlzLmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFsbENvdW50cmllcy5wdXNoKGNvdW50cnkpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgZ2V0UGhvbmVOdW1iZXJQbGFjZUhvbGRlcihjb3VudHJ5Q29kZTogc3RyaW5nKTogc3RyaW5nIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnBob25lVXRpbC5mb3JtYXQodGhpcy5waG9uZVV0aWwuZ2V0RXhhbXBsZU51bWJlcihjb3VudHJ5Q29kZSksIGxwbi5QaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmV0dXJuIGU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcclxuXHRcdHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XHJcblx0fVxyXG5cclxuXHRyZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcblx0XHR0aGlzLm9uVG91Y2hlZCA9IGZuO1xyXG5cdH1cclxuXHJcblx0c2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHR0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuXHR9XHJcblxyXG5cdHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcclxuXHRcdGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmluaXQoKTtcclxuXHRcdH1cclxuXHRcdHRoaXMucGhvbmVOdW1iZXIgPSBvYmo7XHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dGhpcy5vblBob25lTnVtYmVyQ2hhbmdlKCk7XHJcblx0XHR9LCAxKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q291bnRyeUlzb0NvZGUoY291bnRyeUNvZGU6IG51bWJlciwgbnVtYmVyOiBscG4uUGhvbmVOdW1iZXIpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG5cdFx0Ly8gV2lsbCB1c2UgdGhpcyB0byBtYXRjaCBhcmVhIGNvZGUgZnJvbSB0aGUgZmlyc3QgbnVtYmVyc1xyXG5cdFx0Y29uc3QgcmF3TnVtYmVyID0gbnVtYmVyWyd2YWx1ZXNfJ11bJzInXS50b1N0cmluZygpO1xyXG5cdFx0Ly8gTGlzdCBvZiBhbGwgY291bnRyaWVzIHdpdGggY291bnRyeUNvZGUgKGNhbiBiZSBtb3JlIHRoYW4gb25lLiBlLnguIFVTLCBDQSwgRE8sIFBSIGFsbCBoYXZlICsxIGNvdW50cnlDb2RlKVxyXG5cdFx0Y29uc3QgY291bnRyaWVzID0gdGhpcy5hbGxDb3VudHJpZXMuZmlsdGVyKGMgPT4gYy5kaWFsQ29kZSA9PT0gY291bnRyeUNvZGUudG9TdHJpbmcoKSk7XHJcblx0XHQvLyBNYWluIGNvdW50cnkgaXMgdGhlIGNvdW50cnksIHdoaWNoIGhhcyBubyBhcmVhQ29kZXMgc3BlY2lmaWVkIGluIGNvdW50cnktY29kZS50cyBmaWxlLlxyXG5cdFx0Y29uc3QgbWFpbkNvdW50cnkgPSBjb3VudHJpZXMuZmluZChjID0+IGMuYXJlYUNvZGVzID09PSB1bmRlZmluZWQpO1xyXG5cdFx0Ly8gU2Vjb25kYXJ5IGNvdW50cmllcyBhcmUgYWxsIGNvdW50cmllcywgd2hpY2ggaGF2ZSBhcmVhQ29kZXMgc3BlY2lmaWVkIGluIGNvdW50cnktY29kZS50cyBmaWxlLlxyXG5cdFx0Y29uc3Qgc2Vjb25kYXJ5Q291bnRyaWVzID0gY291bnRyaWVzLmZpbHRlcihjID0+IGMuYXJlYUNvZGVzICE9PSB1bmRlZmluZWQpO1xyXG5cdFx0bGV0IG1hdGNoZWRDb3VudHJ5ID0gbWFpbkNvdW50cnkgPyBtYWluQ291bnRyeS5pc28yIDogdW5kZWZpbmVkO1xyXG5cclxuXHRcdC8qXHJcblx0XHRcdEludGVyYXRlIG92ZXIgZWFjaCBzZWNvbmRhcnkgY291bnRyeSBhbmQgY2hlY2sgaWYgbmF0aW9uYWxOdW1iZXIgc3RhcnRzIHdpdGggYW55IG9mIGFyZWFDb2RlcyBhdmFpbGFibGUuXHJcblx0XHRcdElmIG5vIG1hdGNoZXMgZm91bmQsIGZhbGxiYWNrIHRvIHRoZSBtYWluIGNvdW50cnkuXHJcblx0XHQqL1xyXG5cdFx0c2Vjb25kYXJ5Q291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XHJcblx0XHRcdGNvdW50cnkuYXJlYUNvZGVzLmZvckVhY2goYXJlYUNvZGUgPT4ge1xyXG5cdFx0XHRcdGlmIChyYXdOdW1iZXIuc3RhcnRzV2l0aChhcmVhQ29kZSkpIHtcclxuXHRcdFx0XHRcdG1hdGNoZWRDb3VudHJ5ID0gY291bnRyeS5pc28yO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gbWF0Y2hlZENvdW50cnk7XHJcblx0fVxyXG5cclxuXHRzZXBhcmF0ZURpYWxDb2RlUGxhY2VIb2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW1vdmVEaWFsQ29kZShwbGFjZWhvbGRlcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHJlbW92ZURpYWxDb2RlKHBob25lTnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiBwaG9uZU51bWJlcikge1xyXG5cdFx0XHRwaG9uZU51bWJlciA9IHBob25lTnVtYmVyLnN1YnN0cihwaG9uZU51bWJlci5pbmRleE9mKCcgJykgKyAxKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwaG9uZU51bWJlcjtcclxuXHR9XHJcblxyXG5cdC8vIGFkanVzdCBpbnB1dCBhbGlnbm1lbnRcclxuXHRwcml2YXRlIGNoZWNrU2VwYXJhdGVEaWFsQ29kZVN0eWxlKCkge1xyXG5cdFx0aWYgKHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiB0aGlzLnNlbGVjdGVkQ291bnRyeSkge1xyXG5cdFx0XHRjb25zdCBjbnRyeUNkID0gdGhpcy5zZWxlY3RlZENvdW50cnkuZGlhbENvZGU7XHJcblx0XHRcdHRoaXMuc2VwYXJhdGVEaWFsQ29kZUNsYXNzID0gJ3NlcGFyYXRlLWRpYWwtY29kZSBpdGktc2RjLScgKyAoY250cnlDZC5sZW5ndGggKyAxKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuc2VwYXJhdGVEaWFsQ29kZUNsYXNzID0gJyc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxufVxyXG4iXX0=