import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreeterComponent } from './components/greeter/greeter.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { OpenClosedComponent } from './components/open-closed/open-closed.component';
import { TooltipsTestComponent } from './components/tooltips-test/tooltips-test.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    AppComponent,
    GreeterComponent,
    OpenClosedComponent,
    TooltipsTestComponent,
    TooltipsTestComponent,
    TooltipDirective,
  ],
  imports: [
    TooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfirmDialogModule,
    DialogModule,
    ButtonModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
