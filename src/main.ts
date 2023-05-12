import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
import { Buffer } from 'buffer';

window.Buffer = Buffer;
(window as any).global = window;

/********************************************************************************************/

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));
