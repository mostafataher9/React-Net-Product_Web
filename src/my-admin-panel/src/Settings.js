import React, { useState } from 'react';
export function Settings() {

        const [settings,Setsettings] = useState({
            primaryColor: '#007bff',
            secondaryColor: '#6c757d'
        });

         function applyBrandingSettings(settings) {
                // Apply the branding settings (e.g., update CSS variables)
                const root = document.documentElement;
                root.style.setProperty('--primary-color', settings.primaryColor);
                root.style.setProperty('--secondary-color', settings.secondaryColor);
            }


        function handleChange(key, value)
         {
            const newSettings = { ...settings, [key]: value };
            Setsettings(newSettings);
            applyBrandingSettings(newSettings); // Apply the new settings
         }

        function BrandingSettings({settings, onChange}) {
              //Use CSS variables for your color palette in your main CSS (e.g. :root) in index.css:
             return(
               <form className="flex-1 flex-col w-[200px]m-20 bg-white border-1 gap-2">
                    
                    <label className="flex items-center text-xl font-bold px-2">
                        Primary color
                        <input className="px-2" type="color" value={settings.primaryColor} onChange={e=> onChange("primaryColor", e.target.value)} />
                    </label>
                     <br />
                    <label className="flexitems-center text-lg font-extrabold px-2">
                         Secondary color
                        <input className="px-2" type="color" value={settings.secondaryColor} onChange={e=> onChange("secondaryColor", e.target.value)} />
                    </label>
               </form> 
             );
        }
        return (    
                <div>
                  <section>
                       <ul>
                             <li> Application Name: Products_Shop</li>
                             <li> Web Icon: <img src="/react-crash-course/src/my-admin-panel/public/product_shop_icon.png" alt="Product Shop Icon" /></li>
                       </ul>
                   </section>

                   <section>
                        <h2>Branding Settings</h2>
                        <BrandingSettings settings={settings} onChange={handleChange} />
                   </section>
                   
                </div>
        );
}