(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('google-libphonenumber'), require('@angular/common'), require('ngx-bootstrap/dropdown'), require('ngx-bootstrap/tooltip')) :
    typeof define === 'function' && define.amd ? define('ngx-intl-tel-input', ['exports', '@angular/core', '@angular/forms', 'google-libphonenumber', '@angular/common', 'ngx-bootstrap/dropdown', 'ngx-bootstrap/tooltip'], factory) :
    (global = global || self, factory(global['ngx-intl-tel-input'] = {}, global.ng.core, global.ng.forms, global['^3']['2']['1'], global.ng.common, global.dropdown, global.tooltip));
}(this, function (exports, core, forms, googleLibphonenumber, common, dropdown, tooltip) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxIntlTelInputService = /** @class */ (function () {
        function NgxIntlTelInputService() {
        }
        NgxIntlTelInputService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxIntlTelInputService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxIntlTelInputService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function NgxIntlTelInputService_Factory() { return new NgxIntlTelInputService(); }, token: NgxIntlTelInputService, providedIn: "root" });
        return NgxIntlTelInputService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var CountryISO = {
        Afghanistan: 'af',
        Albania: 'al',
        Algeria: 'dz',
        AmericanSamoa: 'as',
        Andorra: 'ad',
        Angola: 'ao',
        Anguilla: 'ai',
        AntiguaAndBarbuda: 'ag',
        Argentina: 'ar',
        Armenia: 'am',
        Aruba: 'aw',
        Australia: 'au',
        Austria: 'at',
        Azerbaijan: 'az',
        Bahamas: 'bs',
        Bahrain: 'bh',
        Bangladesh: 'bd',
        Barbados: 'bb',
        Belarus: 'by',
        Belgium: 'be',
        Belize: 'bz',
        Benin: 'bj',
        Bermuda: 'bm',
        Bhutan: 'bt',
        Bolivia: 'bo',
        BosniaAndHerzegovina: 'ba',
        Botswana: 'bw',
        Brazil: 'br',
        BritishIndianOceanTerritory: 'io',
        BritishVirginIslands: 'vg',
        Brunei: 'bn',
        Bulgaria: 'bg',
        BurkinaFaso: 'bf',
        Burundi: 'bi',
        Cambodia: 'kh',
        Cameroon: 'cm',
        Canada: 'ca',
        CapeVerde: 'cv',
        CaribbeanNetherlands: 'bq',
        CaymanIslands: 'ky',
        CentralAfricanRepublic: 'cf',
        Chad: 'td',
        Chile: 'cl',
        China: 'cn',
        ChristmasIsland: 'cx',
        Cocos: 'cc',
        Colombia: 'co',
        Comoros: 'km',
        CongoDRCJamhuriYaKidemokrasiaYaKongo: 'cd',
        CongoRepublicCongoBrazzaville: 'cg',
        CookIslands: 'ck',
        CostaRica: 'cr',
        CôteDIvoire: 'ci',
        Croatia: 'hr',
        Cuba: 'cu',
        Curaçao: 'cw',
        Cyprus: 'cy',
        CzechRepublic: 'cz',
        Denmark: 'dk',
        Djibouti: 'dj',
        Dominica: 'dm',
        DominicanRepublic: 'do',
        Ecuador: 'ec',
        Egypt: 'eg',
        ElSalvador: 'sv',
        EquatorialGuinea: 'gq',
        Eritrea: 'er',
        Estonia: 'ee',
        Ethiopia: 'et',
        FalklandIslands: 'fk',
        FaroeIslands: 'fo',
        Fiji: 'fj',
        Finland: 'fi',
        France: 'fr',
        FrenchGuiana: 'gf',
        FrenchPolynesia: 'pf',
        Gabon: 'ga',
        Gambia: 'gm',
        Georgia: 'ge',
        Germany: 'de',
        Ghana: 'gh',
        Gibraltar: 'gi',
        Greece: 'gr',
        Greenland: 'gl',
        Grenada: 'gd',
        Guadeloupe: 'gp',
        Guam: 'gu',
        Guatemala: 'gt',
        Guernsey: 'gg',
        Guinea: 'gn',
        GuineaBissau: 'gw',
        Guyana: 'gy',
        Haiti: 'ht',
        Honduras: 'hn',
        HongKong: 'hk',
        Hungary: 'hu',
        Iceland: 'is',
        India: 'in',
        Indonesia: 'id',
        Iran: 'ir',
        Iraq: 'iq',
        Ireland: 'ie',
        IsleOfMan: 'im',
        Israel: 'il',
        Italy: 'it',
        Jamaica: 'jm',
        Japan: 'jp',
        Jersey: 'je',
        Jordan: 'jo',
        Kazakhstan: 'kz',
        Kenya: 'ke',
        Kiribati: 'ki',
        Kosovo: 'xk',
        Kuwait: 'kw',
        Kyrgyzstan: 'kg',
        Laos: 'la',
        Latvia: 'lv',
        Lebanon: 'lb',
        Lesotho: 'ls',
        Liberia: 'lr',
        Libya: 'ly',
        Liechtenstein: 'li',
        Lithuania: 'lt',
        Luxembourg: 'lu',
        Macau: 'mo',
        Macedonia: 'mk',
        Madagascar: 'mg',
        Malawi: 'mw',
        Malaysia: 'my',
        Maldives: 'mv',
        Mali: 'ml',
        Malta: 'mt',
        MarshallIslands: 'mh',
        Martinique: 'mq',
        Mauritania: 'mr',
        Mauritius: 'mu',
        Mayotte: 'yt',
        Mexico: 'mx',
        Micronesia: 'fm',
        Moldova: 'md',
        Monaco: 'mc',
        Mongolia: 'mn',
        Montenegro: 'me',
        Montserrat: 'ms',
        Morocco: 'ma',
        Mozambique: 'mz',
        Myanmar: 'mm',
        Namibia: 'na',
        Nauru: 'nr',
        Nepal: 'np',
        Netherlands: 'nl',
        NewCaledonia: 'nc',
        NewZealand: 'nz',
        Nicaragua: 'ni',
        Niger: 'ne',
        Nigeria: 'ng',
        Niue: 'nu',
        NorfolkIsland: 'nf',
        NorthKorea: 'kp',
        NorthernMarianaIslands: 'mp',
        Norway: 'no',
        Oman: 'om',
        Pakistan: 'pk',
        Palau: 'pw',
        Palestine: 'ps',
        Panama: 'pa',
        PapuaNewGuinea: 'pg',
        Paraguay: 'py',
        Peru: 'pe',
        Philippines: 'ph',
        Poland: 'pl',
        Portugal: 'pt',
        PuertoRico: 'pr',
        Qatar: 'qa',
        Réunion: 're',
        Romania: 'ro',
        Russia: 'ru',
        Rwanda: 'rw',
        SaintBarthélemy: 'bl',
        SaintHelena: 'sh',
        SaintKittsAndNevis: 'kn',
        SaintLucia: 'lc',
        SaintMartin: 'mf',
        SaintPierreAndMiquelon: 'pm',
        SaintVincentAndTheGrenadines: 'vc',
        Samoa: 'ws',
        SanMarino: 'sm',
        SãoToméAndPríncipe: 'st',
        SaudiArabia: 'sa',
        Senegal: 'sn',
        Serbia: 'rs',
        Seychelles: 'sc',
        SierraLeone: 'sl',
        Singapore: 'sg',
        SintMaarten: 'sx',
        Slovakia: 'sk',
        Slovenia: 'si',
        SolomonIslands: 'sb',
        Somalia: 'so',
        SouthAfrica: 'za',
        SouthKorea: 'kr',
        SouthSudan: 'ss',
        Spain: 'es',
        SriLanka: 'lk',
        Sudan: 'sd',
        Suriname: 'sr',
        SvalbardAndJanMayen: 'sj',
        Swaziland: 'sz',
        Sweden: 'se',
        Switzerland: 'ch',
        Syria: 'sy',
        Taiwan: 'tw',
        Tajikistan: 'tj',
        Tanzania: 'tz',
        Thailand: 'th',
        TimorLeste: 'tl',
        Togo: 'tg',
        Tokelau: 'tk',
        Tonga: 'to',
        TrinidadAndTobago: 'tt',
        Tunisia: 'tn',
        Turkey: 'tr',
        Turkmenistan: 'tm',
        TurksAndCaicosIslands: 'tc',
        Tuvalu: 'tv',
        USVirginIslands: 'vi',
        Uganda: 'ug',
        Ukraine: 'ua',
        UnitedArabEmirates: 'ae',
        UnitedKingdom: 'gb',
        UnitedStates: 'us',
        Uruguay: 'uy',
        Uzbekistan: 'uz',
        Vanuatu: 'vu',
        VaticanCity: 'va',
        Venezuela: 've',
        Vietnam: 'vn',
        WallisAndFutuna: 'wf',
        WesternSahara: 'eh',
        Yemen: 'ye',
        Zambia: 'zm',
        Zimbabwe: 'zw',
        ÅlandIslands: 'ax',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CountryCode = /** @class */ (function () {
        function CountryCode() {
            this.allCountries = [
                [
                    'Afghanistan (‫افغانستان‬‎)',
                    CountryISO.Afghanistan,
                    '93'
                ],
                [
                    'Albania (Shqipëri)',
                    CountryISO.Albania,
                    '355'
                ],
                [
                    'Algeria (‫الجزائر‬‎)',
                    CountryISO.Algeria,
                    '213'
                ],
                [
                    'American Samoa',
                    'as',
                    '1',
                    1,
                    [
                        '684',
                    ]
                ],
                [
                    'Andorra',
                    CountryISO.Andorra,
                    '376'
                ],
                [
                    'Angola',
                    CountryISO.Angola,
                    '244'
                ],
                [
                    'Anguilla',
                    'ai',
                    '1',
                    1,
                    [
                        '264',
                    ]
                ],
                [
                    'Antigua and Barbuda',
                    'ag',
                    '1',
                    1,
                    [
                        '268',
                    ]
                ],
                [
                    'Argentina',
                    CountryISO.Argentina,
                    '54'
                ],
                [
                    'Armenia (Հայաստան)',
                    CountryISO.Armenia,
                    '374'
                ],
                [
                    'Aruba',
                    CountryISO.Aruba,
                    '297'
                ],
                [
                    'Australia',
                    CountryISO.Australia,
                    '61',
                    0
                ],
                [
                    'Austria (Österreich)',
                    CountryISO.Austria,
                    '43'
                ],
                [
                    'Azerbaijan (Azərbaycan)',
                    CountryISO.Azerbaijan,
                    '994'
                ],
                [
                    'Bahamas',
                    'bs',
                    '1',
                    1,
                    [
                        '242',
                    ]
                ],
                [
                    'Bahrain (‫البحرين‬‎)',
                    CountryISO.Bahrain,
                    '973'
                ],
                [
                    'Bangladesh (বাংলাদেশ)',
                    CountryISO.Bangladesh,
                    '880'
                ],
                [
                    'Barbados',
                    'bb',
                    '1',
                    1,
                    [
                        '246',
                    ]
                ],
                [
                    'Belarus (Беларусь)',
                    CountryISO.Belarus,
                    '375'
                ],
                [
                    'Belgium (België)',
                    CountryISO.Belgium,
                    '32'
                ],
                [
                    'Belize',
                    CountryISO.Belize,
                    '501'
                ],
                [
                    'Benin (Bénin)',
                    CountryISO.Benin,
                    '229'
                ],
                [
                    'Bermuda',
                    'bm',
                    '1',
                    1,
                    [
                        '441',
                    ]
                ],
                [
                    'Bhutan (འབྲུག)',
                    CountryISO.Bhutan,
                    '975'
                ],
                [
                    'Bolivia',
                    CountryISO.Bolivia,
                    '591'
                ],
                [
                    'Bosnia and Herzegovina (Босна и Херцеговина)',
                    CountryISO.BosniaAndHerzegovina,
                    '387'
                ],
                [
                    'Botswana',
                    CountryISO.Botswana,
                    '267'
                ],
                [
                    'Brazil (Brasil)',
                    CountryISO.Brazil,
                    '55'
                ],
                [
                    'British Indian Ocean Territory',
                    CountryISO.BritishIndianOceanTerritory,
                    '246'
                ],
                [
                    'British Virgin Islands',
                    'vg',
                    '1',
                    1,
                    [
                        '284',
                    ]
                ],
                [
                    'Brunei',
                    CountryISO.Brunei,
                    '673'
                ],
                [
                    'Bulgaria (България)',
                    CountryISO.Bulgaria,
                    '359'
                ],
                [
                    'Burkina Faso',
                    CountryISO.BurkinaFaso,
                    '226'
                ],
                [
                    'Burundi (Uburundi)',
                    CountryISO.Burundi,
                    '257'
                ],
                [
                    'Cambodia (កម្ពុជា)',
                    CountryISO.Cambodia,
                    '855'
                ],
                [
                    'Cameroon (Cameroun)',
                    CountryISO.Cameroon,
                    '237'
                ],
                [
                    'Canada',
                    CountryISO.Canada,
                    '1',
                    1,
                    [
                        '204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416',
                        '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587',
                        '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807',
                        '819', '825', '867', '873', '902', '905'
                    ]
                ],
                [
                    'Cape Verde (Kabu Verdi)',
                    CountryISO.CapeVerde,
                    '238'
                ],
                [
                    'Caribbean Netherlands',
                    CountryISO.CaribbeanNetherlands,
                    '599',
                    1
                ],
                [
                    'Cayman Islands',
                    'ky',
                    '1',
                    1,
                    [
                        '345',
                    ]
                ],
                [
                    'Central African Republic (République centrafricaine)',
                    CountryISO.CentralAfricanRepublic,
                    '236'
                ],
                [
                    'Chad (Tchad)',
                    CountryISO.Chad,
                    '235'
                ],
                [
                    'Chile',
                    CountryISO.Chile,
                    '56'
                ],
                [
                    'China (中国)',
                    CountryISO.China,
                    '86'
                ],
                [
                    'Christmas Island',
                    CountryISO.ChristmasIsland,
                    '61',
                    2
                ],
                [
                    'Cocos (Keeling) Islands',
                    CountryISO.Cocos,
                    '61',
                    1
                ],
                [
                    'Colombia',
                    CountryISO.Colombia,
                    '57'
                ],
                [
                    'Comoros (‫جزر القمر‬‎)',
                    CountryISO.Comoros,
                    '269'
                ],
                [
                    'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
                    CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo,
                    '243'
                ],
                [
                    'Congo (Republic) (Congo-Brazzaville)',
                    CountryISO.CongoRepublicCongoBrazzaville,
                    '242'
                ],
                [
                    'Cook Islands',
                    CountryISO.CookIslands,
                    '682'
                ],
                [
                    'Costa Rica',
                    CountryISO.CostaRica,
                    '506'
                ],
                [
                    'Côte d’Ivoire',
                    CountryISO.CôteDIvoire,
                    '225'
                ],
                [
                    'Croatia (Hrvatska)',
                    CountryISO.Croatia,
                    '385'
                ],
                [
                    'Cuba',
                    CountryISO.Cuba,
                    '53'
                ],
                [
                    'Curaçao',
                    CountryISO.Curaçao,
                    '599',
                    0
                ],
                [
                    'Cyprus (Κύπρος)',
                    CountryISO.Cyprus,
                    '357'
                ],
                [
                    'Czech Republic (Česká republika)',
                    CountryISO.CzechRepublic,
                    '420'
                ],
                [
                    'Denmark (Danmark)',
                    CountryISO.Denmark,
                    '45'
                ],
                [
                    'Djibouti',
                    CountryISO.Djibouti,
                    '253'
                ],
                [
                    'Dominica',
                    CountryISO.Dominica,
                    '1767'
                ],
                [
                    'Dominican Republic (República Dominicana)',
                    CountryISO.DominicanRepublic,
                    '1',
                    2,
                    ['809', '829', '849']
                ],
                [
                    'Ecuador',
                    CountryISO.Ecuador,
                    '593'
                ],
                [
                    'Egypt (‫مصر‬‎)',
                    CountryISO.Egypt,
                    '20'
                ],
                [
                    'El Salvador',
                    CountryISO.ElSalvador,
                    '503'
                ],
                [
                    'Equatorial Guinea (Guinea Ecuatorial)',
                    CountryISO.EquatorialGuinea,
                    '240'
                ],
                [
                    'Eritrea',
                    CountryISO.Eritrea,
                    '291'
                ],
                [
                    'Estonia (Eesti)',
                    CountryISO.Estonia,
                    '372'
                ],
                [
                    'Ethiopia',
                    CountryISO.Ethiopia,
                    '251'
                ],
                [
                    'Falkland Islands (Islas Malvinas)',
                    CountryISO.FalklandIslands,
                    '500'
                ],
                [
                    'Faroe Islands (Føroyar)',
                    CountryISO.FaroeIslands,
                    '298'
                ],
                [
                    'Fiji',
                    CountryISO.Fiji,
                    '679'
                ],
                [
                    'Finland (Suomi)',
                    CountryISO.Finland,
                    '358',
                    0
                ],
                [
                    'France',
                    CountryISO.France,
                    '33'
                ],
                [
                    'French Guiana (Guyane française)',
                    CountryISO.FrenchGuiana,
                    '594'
                ],
                [
                    'French Polynesia (Polynésie française)',
                    CountryISO.FrenchPolynesia,
                    '689'
                ],
                [
                    'Gabon',
                    CountryISO.Gabon,
                    '241'
                ],
                [
                    'Gambia',
                    CountryISO.Gambia,
                    '220'
                ],
                [
                    'Georgia (საქართველო)',
                    CountryISO.Georgia,
                    '995'
                ],
                [
                    'Germany (Deutschland)',
                    CountryISO.Germany,
                    '49'
                ],
                [
                    'Ghana (Gaana)',
                    CountryISO.Ghana,
                    '233'
                ],
                [
                    'Gibraltar',
                    CountryISO.Gibraltar,
                    '350'
                ],
                [
                    'Greece (Ελλάδα)',
                    CountryISO.Greece,
                    '30'
                ],
                [
                    'Greenland (Kalaallit Nunaat)',
                    CountryISO.Greenland,
                    '299'
                ],
                [
                    'Grenada',
                    CountryISO.Grenada,
                    '1473'
                ],
                [
                    'Guadeloupe',
                    CountryISO.Guadeloupe,
                    '590',
                    0
                ],
                [
                    'Guam',
                    'gu',
                    '1',
                    1,
                    [
                        '671',
                    ]
                ],
                [
                    'Guatemala',
                    CountryISO.Guatemala,
                    '502'
                ],
                [
                    'Guernsey',
                    CountryISO.Guernsey,
                    '44',
                    1,
                    [1481]
                ],
                [
                    'Guinea (Guinée)',
                    CountryISO.Guinea,
                    '224'
                ],
                [
                    'Guinea-Bissau (Guiné Bissau)',
                    CountryISO.GuineaBissau,
                    '245'
                ],
                [
                    'Guyana',
                    CountryISO.Guyana,
                    '592'
                ],
                [
                    'Haiti',
                    CountryISO.Haiti,
                    '509'
                ],
                [
                    'Honduras',
                    CountryISO.Honduras,
                    '504'
                ],
                [
                    'Hong Kong (香港)',
                    CountryISO.HongKong,
                    '852'
                ],
                [
                    'Hungary (Magyarország)',
                    CountryISO.Hungary,
                    '36'
                ],
                [
                    'Iceland (Ísland)',
                    CountryISO.Iceland,
                    '354'
                ],
                [
                    'India (भारत)',
                    CountryISO.India,
                    '91'
                ],
                [
                    'Indonesia',
                    CountryISO.Indonesia,
                    '62'
                ],
                [
                    'Iran (‫ایران‬‎)',
                    CountryISO.Iran,
                    '98'
                ],
                [
                    'Iraq (‫العراق‬‎)',
                    CountryISO.Iraq,
                    '964'
                ],
                [
                    'Ireland',
                    CountryISO.Ireland,
                    '353'
                ],
                [
                    'Isle of Man',
                    CountryISO.IsleOfMan,
                    '44',
                    2,
                    [1624]
                ],
                [
                    'Israel (‫ישראל‬‎)',
                    CountryISO.Israel,
                    '972'
                ],
                [
                    'Italy (Italia)',
                    CountryISO.Italy,
                    '39',
                    0
                ],
                [
                    'Jamaica',
                    'jm',
                    '1',
                    1,
                    [
                        '876',
                    ]
                ],
                [
                    'Japan (日本)',
                    CountryISO.Japan,
                    '81'
                ],
                [
                    'Jersey',
                    CountryISO.Jersey,
                    '44',
                    3,
                    [1534]
                ],
                [
                    'Jordan (‫الأردن‬‎)',
                    CountryISO.Jordan,
                    '962'
                ],
                [
                    'Kazakhstan (Казахстан)',
                    CountryISO.Kazakhstan,
                    '7',
                    1
                ],
                [
                    'Kenya',
                    CountryISO.Kenya,
                    '254'
                ],
                [
                    'Kiribati',
                    CountryISO.Kiribati,
                    '686'
                ],
                [
                    'Kosovo',
                    CountryISO.Kosovo,
                    '383'
                ],
                [
                    'Kuwait (‫الكويت‬‎)',
                    CountryISO.Kuwait,
                    '965'
                ],
                [
                    'Kyrgyzstan (Кыргызстан)',
                    CountryISO.Kyrgyzstan,
                    '996'
                ],
                [
                    'Laos (ລາວ)',
                    CountryISO.Laos,
                    '856'
                ],
                [
                    'Latvia (Latvija)',
                    CountryISO.Latvia,
                    '371'
                ],
                [
                    'Lebanon (‫لبنان‬‎)',
                    CountryISO.Lebanon,
                    '961'
                ],
                [
                    'Lesotho',
                    CountryISO.Lesotho,
                    '266'
                ],
                [
                    'Liberia',
                    CountryISO.Liberia,
                    '231'
                ],
                [
                    'Libya (‫ليبيا‬‎)',
                    CountryISO.Libya,
                    '218'
                ],
                [
                    'Liechtenstein',
                    CountryISO.Liechtenstein,
                    '423'
                ],
                [
                    'Lithuania (Lietuva)',
                    CountryISO.Lithuania,
                    '370'
                ],
                [
                    'Luxembourg',
                    CountryISO.Luxembourg,
                    '352'
                ],
                [
                    'Macau (澳門)',
                    CountryISO.Macau,
                    '853'
                ],
                [
                    'Macedonia (FYROM) (Македонија)',
                    CountryISO.Macedonia,
                    '389'
                ],
                [
                    'Madagascar (Madagasikara)',
                    CountryISO.Madagascar,
                    '261'
                ],
                [
                    'Malawi',
                    CountryISO.Malawi,
                    '265'
                ],
                [
                    'Malaysia',
                    CountryISO.Malaysia,
                    '60'
                ],
                [
                    'Maldives',
                    CountryISO.Maldives,
                    '960'
                ],
                [
                    'Mali',
                    CountryISO.Mali,
                    '223'
                ],
                [
                    'Malta',
                    CountryISO.Malta,
                    '356'
                ],
                [
                    'Marshall Islands',
                    CountryISO.MarshallIslands,
                    '692'
                ],
                [
                    'Martinique',
                    CountryISO.Martinique,
                    '596'
                ],
                [
                    'Mauritania (‫موريتانيا‬‎)',
                    CountryISO.Mauritania,
                    '222'
                ],
                [
                    'Mauritius (Moris)',
                    CountryISO.Mauritius,
                    '230'
                ],
                [
                    'Mayotte',
                    CountryISO.Mayotte,
                    '262',
                    1
                ],
                [
                    'Mexico (México)',
                    CountryISO.Mexico,
                    '52'
                ],
                [
                    'Micronesia',
                    CountryISO.Micronesia,
                    '691'
                ],
                [
                    'Moldova (Republica Moldova)',
                    CountryISO.Moldova,
                    '373'
                ],
                [
                    'Monaco',
                    CountryISO.Monaco,
                    '377'
                ],
                [
                    'Mongolia (Монгол)',
                    CountryISO.Mongolia,
                    '976'
                ],
                [
                    'Montenegro (Crna Gora)',
                    CountryISO.Montenegro,
                    '382'
                ],
                [
                    'Montserrat',
                    'ms',
                    '1',
                    1,
                    [
                        '664',
                    ]
                ],
                [
                    'Morocco (‫المغرب‬‎)',
                    CountryISO.Morocco,
                    '212',
                    0
                ],
                [
                    'Mozambique (Moçambique)',
                    CountryISO.Mozambique,
                    '258'
                ],
                [
                    'Myanmar (Burma) (မြန်မာ)',
                    CountryISO.Myanmar,
                    '95'
                ],
                [
                    'Namibia (Namibië)',
                    CountryISO.Namibia,
                    '264'
                ],
                [
                    'Nauru',
                    CountryISO.Nauru,
                    '674'
                ],
                [
                    'Nepal (नेपाल)',
                    CountryISO.Nepal,
                    '977'
                ],
                [
                    'Netherlands (Nederland)',
                    CountryISO.Netherlands,
                    '31'
                ],
                [
                    'New Caledonia (Nouvelle-Calédonie)',
                    CountryISO.NewCaledonia,
                    '687'
                ],
                [
                    'New Zealand',
                    CountryISO.NewZealand,
                    '64'
                ],
                [
                    'Nicaragua',
                    CountryISO.Nicaragua,
                    '505'
                ],
                [
                    'Niger (Nijar)',
                    CountryISO.Niger,
                    '227'
                ],
                [
                    'Nigeria',
                    CountryISO.Nigeria,
                    '234'
                ],
                [
                    'Niue',
                    CountryISO.Niue,
                    '683'
                ],
                [
                    'Norfolk Island',
                    CountryISO.NorfolkIsland,
                    '672'
                ],
                [
                    'North Korea (조선 민주주의 인민 공화국)',
                    CountryISO.NorthKorea,
                    '850'
                ],
                [
                    'Northern Mariana Islands',
                    CountryISO.NorthernMarianaIslands,
                    '1670'
                ],
                [
                    'Norway (Norge)',
                    CountryISO.Norway,
                    '47',
                    0
                ],
                [
                    'Oman (‫عُمان‬‎)',
                    CountryISO.Oman,
                    '968'
                ],
                [
                    'Pakistan (‫پاکستان‬‎)',
                    CountryISO.Pakistan,
                    '92'
                ],
                [
                    'Palau',
                    CountryISO.Palau,
                    '680'
                ],
                [
                    'Palestine (‫فلسطين‬‎)',
                    CountryISO.Palestine,
                    '970'
                ],
                [
                    'Panama (Panamá)',
                    CountryISO.Panama,
                    '507'
                ],
                [
                    'Papua New Guinea',
                    CountryISO.PapuaNewGuinea,
                    '675'
                ],
                [
                    'Paraguay',
                    CountryISO.Paraguay,
                    '595'
                ],
                [
                    'Peru (Perú)',
                    CountryISO.Peru,
                    '51'
                ],
                [
                    'Philippines',
                    CountryISO.Philippines,
                    '63'
                ],
                [
                    'Poland (Polska)',
                    CountryISO.Poland,
                    '48'
                ],
                [
                    'Portugal',
                    CountryISO.Portugal,
                    '351'
                ],
                [
                    'Puerto Rico',
                    CountryISO.PuertoRico,
                    '1',
                    3,
                    ['787', '939']
                ],
                [
                    'Qatar (‫قطر‬‎)',
                    CountryISO.Qatar,
                    '974'
                ],
                [
                    'Réunion (La Réunion)',
                    CountryISO.Réunion,
                    '262',
                    0
                ],
                [
                    'Romania (România)',
                    CountryISO.Romania,
                    '40'
                ],
                [
                    'Russia (Россия)',
                    CountryISO.Russia,
                    '7',
                    0
                ],
                [
                    'Rwanda',
                    CountryISO.Rwanda,
                    '250'
                ],
                [
                    'Saint Barthélemy (Saint-Barthélemy)',
                    CountryISO.SaintBarthélemy,
                    '590',
                    1
                ],
                [
                    'Saint Helena',
                    CountryISO.SaintHelena,
                    '290'
                ],
                [
                    'Saint Kitts and Nevis',
                    CountryISO.SaintKittsAndNevis,
                    '1869'
                ],
                [
                    'Saint Lucia',
                    'lc',
                    '1',
                    1,
                    [
                        '758',
                    ]
                ],
                [
                    'Saint Martin (Saint-Martin (partie française))',
                    CountryISO.SaintMartin,
                    '590',
                    2
                ],
                [
                    'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
                    CountryISO.SaintPierreAndMiquelon,
                    '508'
                ],
                [
                    'Saint Vincent and the Grenadines',
                    'vc',
                    '1',
                    1,
                    [
                        '784',
                    ]
                ],
                [
                    'Samoa',
                    CountryISO.Samoa,
                    '685'
                ],
                [
                    'San Marino',
                    CountryISO.SanMarino,
                    '378'
                ],
                [
                    'São Tomé and Príncipe (São Tomé e Príncipe)',
                    CountryISO.SãoToméAndPríncipe,
                    '239'
                ],
                [
                    'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
                    CountryISO.SaudiArabia,
                    '966'
                ],
                [
                    'Senegal (Sénégal)',
                    CountryISO.Senegal,
                    '221'
                ],
                [
                    'Serbia (Србија)',
                    CountryISO.Serbia,
                    '381'
                ],
                [
                    'Seychelles',
                    CountryISO.Seychelles,
                    '248'
                ],
                [
                    'Sierra Leone',
                    CountryISO.SierraLeone,
                    '232'
                ],
                [
                    'Singapore',
                    CountryISO.Singapore,
                    '65'
                ],
                [
                    'Sint Maarten',
                    'sx',
                    '1',
                    1,
                    [
                        '721',
                    ]
                ],
                [
                    'Slovakia (Slovensko)',
                    CountryISO.Slovakia,
                    '421'
                ],
                [
                    'Slovenia (Slovenija)',
                    CountryISO.Slovenia,
                    '386'
                ],
                [
                    'Solomon Islands',
                    CountryISO.SolomonIslands,
                    '677'
                ],
                [
                    'Somalia (Soomaaliya)',
                    CountryISO.Somalia,
                    '252'
                ],
                [
                    'South Africa',
                    CountryISO.SouthAfrica,
                    '27'
                ],
                [
                    'South Korea (대한민국)',
                    CountryISO.SouthKorea,
                    '82'
                ],
                [
                    'South Sudan (‫جنوب السودان‬‎)',
                    CountryISO.SouthSudan,
                    '211'
                ],
                [
                    'Spain (España)',
                    CountryISO.Spain,
                    '34'
                ],
                [
                    'Sri Lanka (ශ්‍රී ලංකාව)',
                    CountryISO.SriLanka,
                    '94'
                ],
                [
                    'Sudan (‫السودان‬‎)',
                    CountryISO.Sudan,
                    '249'
                ],
                [
                    'Suriname',
                    CountryISO.Suriname,
                    '597'
                ],
                [
                    'Svalbard and Jan Mayen',
                    CountryISO.SvalbardAndJanMayen,
                    '47',
                    1
                ],
                [
                    'Swaziland',
                    CountryISO.Swaziland,
                    '268'
                ],
                [
                    'Sweden (Sverige)',
                    CountryISO.Sweden,
                    '46'
                ],
                [
                    'Switzerland (Schweiz)',
                    CountryISO.Switzerland,
                    '41'
                ],
                [
                    'Syria (‫سوريا‬‎)',
                    CountryISO.Syria,
                    '963'
                ],
                [
                    'Taiwan (台灣)',
                    CountryISO.Taiwan,
                    '886'
                ],
                [
                    'Tajikistan',
                    CountryISO.Tajikistan,
                    '992'
                ],
                [
                    'Tanzania',
                    CountryISO.Tanzania,
                    '255'
                ],
                [
                    'Thailand (ไทย)',
                    CountryISO.Thailand,
                    '66'
                ],
                [
                    'Timor-Leste',
                    CountryISO.TimorLeste,
                    '670'
                ],
                [
                    'Togo',
                    CountryISO.Togo,
                    '228'
                ],
                [
                    'Tokelau',
                    CountryISO.Tokelau,
                    '690'
                ],
                [
                    'Tonga',
                    CountryISO.Tonga,
                    '676'
                ],
                [
                    'Trinidad and Tobago',
                    'tt',
                    '1',
                    1,
                    [
                        '868',
                    ]
                ],
                [
                    'Tunisia (‫تونس‬‎)',
                    CountryISO.Tunisia,
                    '216'
                ],
                [
                    'Turkey (Türkiye)',
                    CountryISO.Turkey,
                    '90'
                ],
                [
                    'Turkmenistan',
                    CountryISO.Turkmenistan,
                    '993'
                ],
                [
                    'Turks and Caicos Islands',
                    CountryISO.TurksAndCaicosIslands,
                    '1649'
                ],
                [
                    'Tuvalu',
                    CountryISO.Tuvalu,
                    '688'
                ],
                [
                    'U.S. Virgin Islands',
                    'vi',
                    '1',
                    1,
                    [
                        '340',
                    ]
                ],
                [
                    'Uganda',
                    CountryISO.Uganda,
                    '256'
                ],
                [
                    'Ukraine (Україна)',
                    CountryISO.Ukraine,
                    '380'
                ],
                [
                    'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
                    CountryISO.UnitedArabEmirates,
                    '971'
                ],
                [
                    'United Kingdom',
                    CountryISO.UnitedKingdom,
                    '44',
                    0
                ],
                [
                    'United States',
                    CountryISO.UnitedStates,
                    '1',
                    0
                ],
                [
                    'Uruguay',
                    CountryISO.Uruguay,
                    '598'
                ],
                [
                    'Uzbekistan (Oʻzbekiston)',
                    CountryISO.Uzbekistan,
                    '998'
                ],
                [
                    'Vanuatu',
                    CountryISO.Vanuatu,
                    '678'
                ],
                [
                    'Vatican City (Città del Vaticano)',
                    CountryISO.VaticanCity,
                    '39',
                    1
                ],
                [
                    'Venezuela',
                    CountryISO.Venezuela,
                    '58'
                ],
                [
                    'Vietnam (Việt Nam)',
                    CountryISO.Vietnam,
                    '84'
                ],
                [
                    'Wallis and Futuna',
                    CountryISO.WallisAndFutuna,
                    '681'
                ],
                [
                    'Western Sahara (‫الصحراء الغربية‬‎)',
                    CountryISO.WesternSahara,
                    '212',
                    1
                ],
                [
                    'Yemen (‫اليمن‬‎)',
                    CountryISO.Yemen,
                    '967'
                ],
                [
                    'Zambia',
                    CountryISO.Zambia,
                    '260'
                ],
                [
                    'Zimbabwe',
                    CountryISO.Zimbabwe,
                    '263'
                ],
                [
                    'Åland Islands',
                    CountryISO.ÅlandIslands,
                    '358',
                    1
                ]
            ];
        }
        return CountryCode;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var phoneNumberValidator = (/**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        /** @type {?} */
        var id = control.value && control.value.id ? control.value.id : 'phone';
        /** @type {?} */
        var el = document.getElementById(id) ? document.getElementById(id) : undefined;
        if (el) {
            /** @type {?} */
            var isCheckValidation = el.getAttribute('validation');
            if (isCheckValidation === 'true') {
                /** @type {?} */
                var isRequired = control.errors && control.errors.required === true;
                /** @type {?} */
                var error = { validatePhoneNumber: { valid: false } };
                /** @type {?} */
                var number = void 0;
                try {
                    number = googleLibphonenumber.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
                }
                catch (e) {
                    if (isRequired === true) {
                        return error;
                    }
                }
                if (control.value) {
                    if (!number) {
                        return error;
                    }
                    else {
                        if (!googleLibphonenumber.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
                            return error;
                        }
                    }
                }
            }
            else if (isCheckValidation === 'false') {
                control.clearValidators();
            }
        }
        return;
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var SearchCountryField = {
        DialCode: 'dialCode',
        Iso2: 'iso2',
        Name: 'name',
        All: 'all',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {string} */
    var TooltipLabel = {
        Name: 'name',
        Iso2: 'iso2',
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.countryChange = new core.EventEmitter();
            this.enter = new core.EventEmitter();
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
            this.phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
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
                var intlNo = number ? this.phoneUtil.format(number, googleLibphonenumber.PhoneNumberFormat.INTERNATIONAL) : '';
                // parse phoneNumber if separate dial code is needed
                if (this.separateDialCode && intlNo) {
                    this.value = this.removeDialCode(intlNo);
                }
                this.propagateChange({
                    number: this.value,
                    internationalNumber: intlNo,
                    nationalNumber: number ? this.phoneUtil.format(number, googleLibphonenumber.PhoneNumberFormat.NATIONAL) : '',
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
                var intlNo = number ? this.phoneUtil.format(number, googleLibphonenumber.PhoneNumberFormat.INTERNATIONAL) : '';
                // parse phoneNumber if separate dial code is needed
                if (this.separateDialCode && intlNo) {
                    this.value = this.removeDialCode(intlNo);
                }
                this.propagateChange({
                    number: this.value,
                    internationalNumber: intlNo,
                    nationalNumber: number ? this.phoneUtil.format(number, googleLibphonenumber.PhoneNumberFormat.NATIONAL) : '',
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
                return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), googleLibphonenumber.PhoneNumberFormat.INTERNATIONAL);
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
            { type: core.Component, args: [{
                        selector: 'ngx-intl-tel-input',
                        template: "<div class=\"intl-tel-input allow-dropdown\" [ngClass]=\"separateDialCodeClass\">\r\n  <div class=\"flag-container\" dropdown [ngClass]=\"{'disabled': readOnly}\" [isDisabled]=\"readOnly\">\r\n    <div class=\"selected-flag dropdown-toggle\" dropdownToggle>\r\n      <div class=\"iti-flag\" [ngClass]=\"selectedCountry?.flagClass\"\r\n        [tooltip]=\"selectedCountry ? selectedCountry[tooltipField] : ''\"></div>\r\n      <div *ngIf=\"separateDialCode\" class=\"selected-dial-code\">+{{selectedCountry.dialCode}}</div>\r\n      <div class=\"iti-arrow\"></div>\r\n    </div>\r\n    <div *dropdownMenu class=\"dropdown-menu country-dropdown\">\r\n      <div class=\"search-container\" *ngIf=\"searchCountryFlag && searchCountryField\">\r\n        <input id=\"country-search-box\" [(ngModel)]=\"countrySearchText\" (keyup)=\"searchCountry()\"\r\n          (click)=\"$event.stopPropagation()\" [placeholder]=\"searchCountryPlaceholder\" autofocus>\r\n      </div>\r\n      <ul class=\"country-list\" #countryList>\r\n        <li class=\"country\" *ngFor=\"let country of preferredCountriesInDropDown\"\r\n          (click)=\"onCountrySelect(country, focusable)\" [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n        <li class=\"divider\" *ngIf=\"preferredCountriesInDropDown?.length\"></li>\r\n        <li class=\"country\" *ngFor=\"let country of allCountries\" (click)=\"onCountrySelect(country, focusable)\"\r\n          [id]=\"country.iso2\">\r\n          <div class=\"flag-box\">\r\n            <div class=\"iti-flag\" [ngClass]=\"country.flagClass\"></div>\r\n          </div>\r\n          <span class=\"country-name\">{{country.name}}</span>\r\n          <span class=\"dial-code\">+{{country.dialCode}}</span>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n  <input type=\"tel\" [id]=\"id\" autocomplete=\"off\" [ngClass]=\"cssClass\" (blur)=\"onTouched()\"\r\n    (keypress)=\"onInputKeyPress($event)\" [(ngModel)]=\"phoneNumber\" (ngModelChange)=\"onPhoneNumberChange()\" (keydown.enter)=\"enter.emit()\"\r\n    [disabled]=\"disabled\" [placeholder]=\"enableCustomPlaceholder ? customPlaceholder : separateDialCodePlaceHolder(selectedCountry?.placeHolder || '') \"\r\n    [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\" #focusable [readOnly]=\"readOnly\" [class.disabled]=\"readOnly\" >\r\n</div>\r\n",
                        providers: [
                            CountryCode,
                            {
                                provide: forms.NG_VALUE_ACCESSOR,
                                // tslint:disable-next-line:no-forward-ref
                                useExisting: core.forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return NgxIntlTelInputComponent; })),
                                multi: true
                            },
                            {
                                provide: forms.NG_VALIDATORS,
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
            value: [{ type: core.Input }],
            preferredCountries: [{ type: core.Input }],
            enablePlaceholder: [{ type: core.Input }],
            cssClass: [{ type: core.Input }],
            onlyCountries: [{ type: core.Input }],
            enableAutoCountrySelect: [{ type: core.Input }],
            searchCountryFlag: [{ type: core.Input }],
            searchCountryField: [{ type: core.Input }],
            searchCountryPlaceholder: [{ type: core.Input }],
            maxLength: [{ type: core.Input }],
            tooltipField: [{ type: core.Input }],
            selectFirstCountry: [{ type: core.Input }],
            selectedCountryISO: [{ type: core.Input }],
            phoneValidation: [{ type: core.Input }],
            id: [{ type: core.Input }],
            enableCustomPlaceholder: [{ type: core.Input }],
            customPlaceholder: [{ type: core.Input }],
            readOnly: [{ type: core.Input }],
            countryChange: [{ type: core.Output }],
            enter: [{ type: core.Output }],
            separateDialCode: [{ type: core.Input }],
            countryList: [{ type: core.ViewChild, args: ['countryList', { static: false },] }]
        };
        return NgxIntlTelInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxIntlTelInputModule = /** @class */ (function () {
        function NgxIntlTelInputModule() {
        }
        /**
         * @return {?}
         */
        NgxIntlTelInputModule.forRoot = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: NgxIntlTelInputModule,
                providers: [NgxIntlTelInputService]
            };
        };
        NgxIntlTelInputModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxIntlTelInputComponent],
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            dropdown.BsDropdownModule.forRoot(),
                            tooltip.TooltipModule.forRoot()
                        ],
                        exports: [NgxIntlTelInputComponent]
                    },] }
        ];
        return NgxIntlTelInputModule;
    }());

    exports.CountryISO = CountryISO;
    exports.NgxIntlTelInputComponent = NgxIntlTelInputComponent;
    exports.NgxIntlTelInputModule = NgxIntlTelInputModule;
    exports.NgxIntlTelInputService = NgxIntlTelInputService;
    exports.SearchCountryField = SearchCountryField;
    exports.TooltipLabel = TooltipLabel;
    exports.ɵa = CountryCode;
    exports.ɵb = phoneNumberValidator;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-intl-tel-input.umd.js.map
