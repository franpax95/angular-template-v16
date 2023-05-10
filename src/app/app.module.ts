import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components.module';
import { PagesModule } from './modules/pages.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './modules/pipes.modules';
import { DirectivesModule } from './modules/directives.module';

const custom_modules: Array<any> = [ComponentsModule, DirectivesModule, PagesModule, PipesModule];

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ...custom_modules],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
