import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

console.log(
 `
                █                     █                
               ████                  ███               
              ██████ █████████████ ██████              
              ███████████████████████████              
               █████████████████████████               
                ███████████████████████                
               █████   █████████    ████               
               ███       █████        ███              
               ██         ████        ███              
               ███       █████        ███              
               ████     ████████    ████               
                ████████████████████████               
                 █████████████████████                 
                  ███████████████████                  
                     ██████████████                    
                         █████                         
                                                       
    ██████╗  █████╗ ██████╗ ██╗ ██████╗██╗  ██╗
    ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝██║ ██╔╝
    ██║  ██║███████║██████╔╝██║██║     █████╔╝ 
    ██║  ██║██╔══██║██╔══██╗██║██║     ██╔═██╗ 
    ██████╔╝██║  ██║██║  ██║██║╚██████╗██║  ██╗
    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝                      
 `
)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
//   if ('serviceWorker' in navigator) {
//    navigator.serviceWorker.register('/firebase-messaging-sw.js')
//      .then(reg => console.log("Service Worker registrado", reg))
//      .catch(err => console.log("Error registrando SW", err));
//  }
 