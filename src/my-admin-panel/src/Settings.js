import React, { useState } from 'react';
import "./App.css";
export function Settings() {

        const [settings,Setsettings] = useState({
            primaryColor: '#007bff',
            secondaryColor: '#6c757d',
            fontFamily: 'Arial, sans-serif'
        });

        const pagesData=[{
               key: 'home',
               title: 'Product Catalog',
               metaDescription: 'Browse our amazing product collection',
                metaKeywords: 'products, shop, catalog'
            },
            {
               key: 'about',
               title: 'About',
               metaDescription: 'Learn more about our company',
                metaKeywords: 'about, company, story'
            },
            {
               key: 'contact',
               title: 'Contact Us',
               metaDescription: 'Contact us for any questions',
               metaKeywords: 'contact, support, help'
            }
        ]
        const [selected,setSelected]=useState(pagesData[0].key);
        const page=pagesData.find(p=>p.key===selected) || pagesData[0];



        //for SEO optimization
        function EditPageMeta({page}){
            return(
                <div className="page-Edits">
                   <div className="border border-gray-300 rounded-lg bg-gray-800 p-4 flex flex-col gap-4">
                     <label className="flex flex-col items-start text-lg font-bold px-2">
                        Page Title
                        <input className="px-2 mt-2 w-full" value={page.title} type="text" placeholder="Edit Title Tag" />
                    </label>
                
                   <label className="flex flex-col items-start text-lg font-bold px-2">
                          Page Description
                        <textarea className="px-2 mt-2 w-full h-20" value={page.metaDescription} placeholder="Edit Meta Description" />
                    </label>
                   

                     <label className="flex flex-col items-start text-lg font-bold px-2">
                         Page Keywords
                         <input className="px-2 mt-2 w-full" value={page.metaKeywords} type="text" placeholder="Edit Meta Keywords" />
                    </label>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" type="submit">Save</button>
                   </div>
                </div>
            );
        }

        function AdminMetaEditor() {
            return(
                <div className="page-Edits">
                    <label className="flex flex-col items-center text-lg font-extrabold px-2">
                       Select Page
                       <select className="page-Edits-select" value={selected} onChange={e => setSelected(e.target.value)}>
                        {pagesData.map(page => (
                            <option key={page.key} value={page.key}>
                                {page.title}
                            </option>
                        ))}
                    </select>
                    </label>
                </div>
            );
        }

         function applyBrandingSettings(settings) {
                // Apply the branding settings (e.g., update CSS variables)
                const root = document.documentElement;
                root.style.setProperty('--primary-color', settings.primaryColor);
                root.style.setProperty('--secondary-color', settings.secondaryColor);
                root.style.setProperty('--font-family', settings.fontFamily);
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
               <form className="page-Edits">
                  <div className="flex flex-row gap-4 items-center mb-6">
                    <label className="flex flex-col items-center text-lg font-bold px-2">
                        Primary color
                        <input className="px-2 mt-2" type="color" value={settings.primaryColor} onChange={e=> handleChange("primaryColor", e.target.value)} />
                    </label>
                    
                    <label className="flex flex-col items-center text-lg font-bold px-2">
                         Secondary color
                        <input className="px-2 mt-2" type="color" value={settings.secondaryColor} onChange={e=> handleChange("secondaryColor", e.target.value)} />
                    </label>
                    
                    <label className="flex flex-col items-center text-lg font-bold px-2">
                         Font Family
                        <input className="px-2 mt-2" type="text" value={settings.fontFamily} onChange={e=> handleChange("fontFamily", e.target.value)} />
                    </label>
                  </div>
                  <div>
                    <AdminMetaEditor />
                    <br />
                    <EditPageMeta page={page} />
                  </div>
               </form> 
             );
        }

            return (    
                <div className="p-8">
                  <section className="my-16 mx-auto p-8 max-w-md bg-gray-500 border border-gray-300 rounded-lg shadow-md">
                       <ul className="space-y-4">
                             <li className="text-lg"> <strong>Application Name:</strong> Products_Shop</li>
                             <li className="text-lg flex items-center gap-3"> <strong>Web Icon:</strong> <img className="w-8 h-8" src="/react-crash-course/src/my-admin-panel/public/product_shop_icon.png" alt="Product Shop Icon" /></li>
                       </ul>
                   </section>

                   <section className="my-8 mx-auto p-6 max-w-2xl">
                        <h2 className="text-2xl font-bold mb-6">Branding Settings</h2>
                        <BrandingSettings settings={settings} onChange={handleChange} />
                   </section>
                   
                </div>
        );
}