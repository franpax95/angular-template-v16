import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from 'src/app/modules/components.module';
import { DirectivesModule } from 'src/app/modules/directives.module';

@NgModule({
	imports: [CommonModule, HomeRoutingModule, FormsModule, ComponentsModule, DirectivesModule],
	declarations: [HomePage],
})
export class HomeModule {}
