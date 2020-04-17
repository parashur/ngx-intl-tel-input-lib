/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as lpn from 'google-libphonenumber';
/** @type {?} */
export const phoneNumberValidator = (/**
 * @param {?} control
 * @return {?}
 */
(control) => {
    /** @type {?} */
    const id = control.value && control.value.id ? control.value.id : 'phone';
    /** @type {?} */
    const el = document.getElementById(id) ? document.getElementById(id) : undefined;
    if (el) {
        /** @type {?} */
        const isCheckValidation = el.getAttribute('validation');
        if (isCheckValidation === 'true') {
            /** @type {?} */
            const isRequired = control.errors && control.errors.required === true;
            /** @type {?} */
            const error = { validatePhoneNumber: { valid: false } };
            /** @type {?} */
            let number;
            try {
                number = lpn.PhoneNumberUtil.getInstance().parse(control.value.number, control.value.countryCode);
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
                    if (!lpn.PhoneNumberUtil.getInstance().isValidNumberForRegion(number, control.value.countryCode)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDOztBQUU3QyxNQUFNLE9BQU8sb0JBQW9COzs7O0FBQUcsQ0FBQyxPQUFvQixFQUFFLEVBQUU7O1VBQ3RELEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTzs7VUFDbkUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDaEYsSUFBSSxFQUFFLEVBQUU7O2NBQ0QsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdkQsSUFBSSxpQkFBaUIsS0FBSyxNQUFNLEVBQUU7O2tCQUMzQixVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJOztrQkFDL0QsS0FBSyxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7O2dCQUNuRCxNQUF1QjtZQUUzQixJQUFJO2dCQUNILE1BQU0sR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2xHO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUFFO2FBQzFDO1lBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNaLE9BQU8sS0FBSyxDQUFDO2lCQUNiO3FCQUFNO29CQUNOLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO3dCQUNqRyxPQUFPLEtBQUssQ0FBQztxQkFDYjtpQkFDRDthQUNEO1NBQ0Q7YUFBTSxJQUFJLGlCQUFpQixLQUFLLE9BQU8sRUFBRTtZQUN6QyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7S0FDRDtJQUNELE9BQU87QUFFUixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICogYXMgbHBuIGZyb20gJ2dvb2dsZS1saWJwaG9uZW51bWJlcic7XHJcblxyXG5leHBvcnQgY29uc3QgcGhvbmVOdW1iZXJWYWxpZGF0b3IgPSAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IHtcclxuXHRjb25zdCBpZCA9IGNvbnRyb2wudmFsdWUgJiYgY29udHJvbC52YWx1ZS5pZCA/IGNvbnRyb2wudmFsdWUuaWQgOiAncGhvbmUnO1xyXG5cdGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogdW5kZWZpbmVkO1xyXG5cdGlmIChlbCkge1xyXG5cdFx0Y29uc3QgaXNDaGVja1ZhbGlkYXRpb24gPSBlbC5nZXRBdHRyaWJ1dGUoJ3ZhbGlkYXRpb24nKTtcclxuXHRcdGlmIChpc0NoZWNrVmFsaWRhdGlvbiA9PT0gJ3RydWUnKSB7XHJcblx0XHRcdGNvbnN0IGlzUmVxdWlyZWQgPSBjb250cm9sLmVycm9ycyAmJiBjb250cm9sLmVycm9ycy5yZXF1aXJlZCA9PT0gdHJ1ZTtcclxuXHRcdFx0Y29uc3QgZXJyb3IgPSB7IHZhbGlkYXRlUGhvbmVOdW1iZXI6IHsgdmFsaWQ6IGZhbHNlIH0gfTtcclxuXHRcdFx0bGV0IG51bWJlcjogbHBuLlBob25lTnVtYmVyO1xyXG5cclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRudW1iZXIgPSBscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCkucGFyc2UoY29udHJvbC52YWx1ZS5udW1iZXIsIGNvbnRyb2wudmFsdWUuY291bnRyeUNvZGUpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0aWYgKGlzUmVxdWlyZWQgPT09IHRydWUpIHsgcmV0dXJuIGVycm9yOyB9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChjb250cm9sLnZhbHVlKSB7XHJcblx0XHRcdFx0aWYgKCFudW1iZXIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBlcnJvcjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0aWYgKCFscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCkuaXNWYWxpZE51bWJlckZvclJlZ2lvbihudW1iZXIsIGNvbnRyb2wudmFsdWUuY291bnRyeUNvZGUpKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBlcnJvcjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoaXNDaGVja1ZhbGlkYXRpb24gPT09ICdmYWxzZScpIHtcclxuXHRcdFx0Y29udHJvbC5jbGVhclZhbGlkYXRvcnMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuO1xyXG5cclxufTtcclxuIl19