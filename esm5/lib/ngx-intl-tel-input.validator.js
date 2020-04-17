/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as lpn from 'google-libphonenumber';
/** @type {?} */
export var phoneNumberValidator = (/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0LnZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDOztBQUU3QyxNQUFNLEtBQU8sb0JBQW9COzs7O0FBQUcsVUFBQyxPQUFvQjs7UUFDbEQsRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPOztRQUNuRSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztJQUNoRixJQUFJLEVBQUUsRUFBRTs7WUFDRCxpQkFBaUIsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUN2RCxJQUFJLGlCQUFpQixLQUFLLE1BQU0sRUFBRTs7Z0JBQzNCLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUk7O2dCQUMvRCxLQUFLLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTs7Z0JBQ25ELE1BQU0sU0FBaUI7WUFFM0IsSUFBSTtnQkFDSCxNQUFNLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNsRztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNYLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTthQUMxQztZQUVELElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWixPQUFPLEtBQUssQ0FBQztpQkFDYjtxQkFBTTtvQkFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDakcsT0FBTyxLQUFLLENBQUM7cUJBQ2I7aUJBQ0Q7YUFDRDtTQUNEO2FBQU0sSUFBSSxpQkFBaUIsS0FBSyxPQUFPLEVBQUU7WUFDekMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0tBQ0Q7SUFDRCxPQUFPO0FBRVIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIGxwbiBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IHBob25lTnVtYmVyVmFsaWRhdG9yID0gKGNvbnRyb2w6IEZvcm1Db250cm9sKSA9PiB7XHJcblx0Y29uc3QgaWQgPSBjb250cm9sLnZhbHVlICYmIGNvbnRyb2wudmFsdWUuaWQgPyBjb250cm9sLnZhbHVlLmlkIDogJ3Bob25lJztcclxuXHRjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSA6IHVuZGVmaW5lZDtcclxuXHRpZiAoZWwpIHtcclxuXHRcdGNvbnN0IGlzQ2hlY2tWYWxpZGF0aW9uID0gZWwuZ2V0QXR0cmlidXRlKCd2YWxpZGF0aW9uJyk7XHJcblx0XHRpZiAoaXNDaGVja1ZhbGlkYXRpb24gPT09ICd0cnVlJykge1xyXG5cdFx0XHRjb25zdCBpc1JlcXVpcmVkID0gY29udHJvbC5lcnJvcnMgJiYgY29udHJvbC5lcnJvcnMucmVxdWlyZWQgPT09IHRydWU7XHJcblx0XHRcdGNvbnN0IGVycm9yID0geyB2YWxpZGF0ZVBob25lTnVtYmVyOiB7IHZhbGlkOiBmYWxzZSB9IH07XHJcblx0XHRcdGxldCBudW1iZXI6IGxwbi5QaG9uZU51bWJlcjtcclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bnVtYmVyID0gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLnBhcnNlKGNvbnRyb2wudmFsdWUubnVtYmVyLCBjb250cm9sLnZhbHVlLmNvdW50cnlDb2RlKTtcclxuXHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdGlmIChpc1JlcXVpcmVkID09PSB0cnVlKSB7IHJldHVybiBlcnJvcjsgfVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoY29udHJvbC52YWx1ZSkge1xyXG5cdFx0XHRcdGlmICghbnVtYmVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGlmICghbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLmlzVmFsaWROdW1iZXJGb3JSZWdpb24obnVtYmVyLCBjb250cm9sLnZhbHVlLmNvdW50cnlDb2RlKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZXJyb3I7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGlzQ2hlY2tWYWxpZGF0aW9uID09PSAnZmFsc2UnKSB7XHJcblx0XHRcdGNvbnRyb2wuY2xlYXJWYWxpZGF0b3JzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybjtcclxuXHJcbn07XHJcbiJdfQ==