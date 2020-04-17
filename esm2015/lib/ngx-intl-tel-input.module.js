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
export class NgxIntlTelInputModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxIntlTelInputModule,
            providers: [NgxIntlTelInputService]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWludGwtdGVsLWlucHV0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbnRsLXRlbC1pbnB1dC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW50bC10ZWwtaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQWF0RCxNQUFNLE9BQU8scUJBQXFCOzs7O0lBQ2pDLE1BQU0sQ0FBQyxPQUFPO1FBQ2IsT0FBTztZQUNOLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDbkMsQ0FBQztJQUNILENBQUM7OztZQWpCRCxRQUFRLFNBQUM7Z0JBQ1QsWUFBWSxFQUFFLENBQUMsd0JBQXdCLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRTtvQkFDUixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLGFBQWEsQ0FBQyxPQUFPLEVBQUU7aUJBQ3ZCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHdCQUF3QixDQUFDO2FBQ25DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4SW50bFRlbElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5neEludGxUZWxJbnB1dFNlcnZpY2UgfSBmcm9tICcuL25neC1pbnRsLXRlbC1pbnB1dC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xyXG5pbXBvcnQgeyBUb29sdGlwTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90b29sdGlwJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcblx0ZGVjbGFyYXRpb25zOiBbTmd4SW50bFRlbElucHV0Q29tcG9uZW50XSxcclxuXHRpbXBvcnRzOiBbXHJcblx0XHRDb21tb25Nb2R1bGUsXHJcblx0XHRGb3Jtc01vZHVsZSxcclxuXHRcdFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcblx0XHRCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKSxcclxuXHRcdFRvb2x0aXBNb2R1bGUuZm9yUm9vdCgpXHJcblx0XSxcclxuXHRleHBvcnRzOiBbTmd4SW50bFRlbElucHV0Q29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4SW50bFRlbElucHV0TW9kdWxlIHtcclxuXHRzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdG5nTW9kdWxlOiBOZ3hJbnRsVGVsSW5wdXRNb2R1bGUsXHJcblx0XHRcdHByb3ZpZGVyczogW05neEludGxUZWxJbnB1dFNlcnZpY2VdXHJcblx0XHR9O1xyXG5cdH1cclxufVxyXG4iXX0=