/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { NgxIntlTelInputComponent } from './ngx-intl-tel-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIntlTelInputService } from './ngx-intl-tel-input.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
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
        { type: NgModule, args: [{
                    declarations: [NgxIntlTelInputComponent],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        BsDropdownModule.forRoot(),
                        TooltipModule.forRoot()
                    ],
                    exports: [NgxIntlTelInputComponent]
                },] }
    ];
    return NgxIntlTelInputModule;
}());
export { NgxIntlTelInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV0RDtJQUFBO0lBa0JBLENBQUM7Ozs7SUFOTyw2QkFBTzs7O0lBQWQ7UUFDQyxPQUFPO1lBQ04sUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUNuQyxDQUFDO0lBQ0gsQ0FBQzs7Z0JBakJELFFBQVEsU0FBQztvQkFDVCxZQUFZLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztvQkFDeEMsT0FBTyxFQUFFO3dCQUNSLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGdCQUFnQixDQUFDLE9BQU8sRUFBRTt3QkFDMUIsYUFBYSxDQUFDLE9BQU8sRUFBRTtxQkFDdkI7b0JBQ0QsT0FBTyxFQUFFLENBQUMsd0JBQXdCLENBQUM7aUJBQ25DOztJQVFELDRCQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FQWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0U2VydmljZSB9IGZyb20gJy4vbmd4LWludGwtdGVsLWlucHV0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBCc0Ryb3Bkb3duTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9kcm9wZG93bic7XHJcbmltcG9ydCB7IFRvb2x0aXBNb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Rvb2x0aXAnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuXHRkZWNsYXJhdGlvbnM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnRdLFxyXG5cdGltcG9ydHM6IFtcclxuXHRcdENvbW1vbk1vZHVsZSxcclxuXHRcdEZvcm1zTW9kdWxlLFxyXG5cdFx0UmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuXHRcdEJzRHJvcGRvd25Nb2R1bGUuZm9yUm9vdCgpLFxyXG5cdFx0VG9vbHRpcE1vZHVsZS5mb3JSb290KClcclxuXHRdLFxyXG5cdGV4cG9ydHM6IFtOZ3hJbnRsVGVsSW5wdXRDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hJbnRsVGVsSW5wdXRNb2R1bGUge1xyXG5cdHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0bmdNb2R1bGU6IE5neEludGxUZWxJbnB1dE1vZHVsZSxcclxuXHRcdFx0cHJvdmlkZXJzOiBbTmd4SW50bFRlbElucHV0U2VydmljZV1cclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiJdfQ==