import { Component } from '@angular/core';
import { TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef, Input} from '@angular/core';

@Component({
  selector: 'panel',
  template: `
     <ng-template #tpladmin><span>Admin panel</span></ng-template>
  `,
  styles: []
})
export class PanelComponent {

  @ViewChild('tpladmin') _tpladmin: TemplateRef<any>;

  private view: EmbeddedViewRef<Object>;

  @Input() set isAdmin(value: boolean) {
    if (value) {
      this.view = this.viewContainerRef.createEmbeddedView(this._tpladmin);
   } else {
     this.viewContainerRef.clear();

   }
  }

  constructor(private viewContainerRef: ViewContainerRef) {}
}
