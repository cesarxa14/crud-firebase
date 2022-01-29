import { NgModule} from '@angular/core';
import { ButtonModule}  from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {FieldsetModule} from 'primeng/fieldset';
import {CarouselModule} from 'primeng/carousel';
import {SidebarModule} from 'primeng/sidebar';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {RatingModule} from 'primeng/rating';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ProgressBarModule} from 'primeng/progressbar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GalleriaModule} from 'primeng/galleria';


import {FilterService, MessageService, PrimeNGConfig} from 'primeng/api';




@NgModule({
    imports: [
       ButtonModule,
       InputTextModule,
       MenubarModule,
       FieldsetModule,
       CarouselModule,
       SidebarModule,
       CardModule,
       TableModule,
       RatingModule,
       DialogModule,
       TooltipModule,
       InputSwitchModule,
       ToastModule,
       DividerModule,
       InputTextareaModule,
       DropdownModule,
       FileUploadModule,
       ScrollPanelModule,
       ProgressBarModule,
       MessagesModule,
       MessageModule,
       RatingModule,
       GalleriaModule
       
       

    ],
    exports: [
       ButtonModule,
       InputTextModule,
       MenubarModule,
       FieldsetModule,
       CarouselModule,
       SidebarModule,
       CardModule,
       TableModule,
       RatingModule,
       DialogModule,
       TooltipModule,
       InputSwitchModule,
       ToastModule,
       DividerModule,
       InputTextareaModule,
       DropdownModule,
       FileUploadModule,
       ScrollPanelModule,
       ProgressBarModule,
       MessagesModule,
       MessageModule,
       RatingModule,
       GalleriaModule
    ],
    providers: [MessageService, FilterService, PrimeNGConfig]
})

export class PrimeModules {}