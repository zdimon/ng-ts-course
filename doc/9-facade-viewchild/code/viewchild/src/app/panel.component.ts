import { Component } from '@angular/core';
import { TemplateRef, ViewChild, ViewContainerRef, EmbeddedViewRef, Input} from '@angular/core';

@Component({
  selector: 'panel',
  template: `
    <div >
     <ng-template #tpladmin><span>Admin panel</span></ng-template>
     <ng-template #tpluser><span>User panel</span></ng-template>
    </div>
    <color></color>
  `,
  styles: []
})
export class PanelComponent {

  @ViewChild('tpladmin') _tpladmin: TemplateRef<any>;
  @ViewChild('tpluser') _tpluser: TemplateRef<any>;

  private view: EmbeddedViewRef<Object>;

  @Input() set isAdmin(value: boolean) {

    if (value) {
       this.viewContainerRef.clear();
       this.view = this.viewContainerRef.createEmbeddedView(this._tpladmin);
    } else {
      this.viewContainerRef.clear();
      this.view = this.viewContainerRef.createEmbeddedView(this._tpluser);
    }
  }

  someMethod(){
    console.log('someMethod firing!!!')
  }

  constructor(private viewContainerRef: ViewContainerRef) {}
}

