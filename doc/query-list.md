


# message.directive.ts

    import { Directive, ViewContainerRef } from '@angular/core';

    @Directive({ 
       selector: '[cpMsg]' 
    })
    export class MessageDirective {
       constructor(public viewContainerRef: ViewContainerRef) { }
    }

ViewContainerRef - представляет контейнер для вьюх.

Далее мы зацепим директиву на дивы. 

    <div cpMsg> </div> .. <div cpMsg> </div>

# cp-msg.component.ts

    import { Component, ViewChild, ViewChildren, AfterViewInit,
     TemplateRef, ViewContainerRef, QueryList } from '@angular/core';
    import { MessageDirective } from './message.directive';

    @Component({
       selector: 'app-msg',
       templateUrl: './cp-msg.component.html'
    })
    export class CpMsgComponent implements  AfterViewInit { 
        @ViewChild('msg')
        private msgTempRef : TemplateRef<any>
	
        @ViewChildren(MessageDirective)
        private queryList: QueryList<MessageDirective> 
	
        ngAfterViewInit() {
	    this.queryList.map(messageDirective => 
	         messageDirective.viewContainerRef.createEmbeddedView(this.msgTempRef));	
        }	
    }

# cp-msg.component.html

    <ng-template #msg>
       Welcome to you.<br/>
       Happy learning!
    </ng-template>

    <h3>Message </h3>

    <div cpMsg> </div>

    <h3>Message </h3>

    <div cpMsg> </div> 


