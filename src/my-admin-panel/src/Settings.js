import React, { useState } from 'react';
import "./App.css";

export function Settings() {

        const [settings,Setsettings] = useState({
            primaryColor: '#3b82f6',     // Modern blue
            secondaryColor: '#64748b',   // Slate gray
            fontFamily: 'Inter, Arial, sans-serif'
        });

        // Predefined color themes
        const colorThemes = {
            modern: { primary: '#3b82f6', secondary: '#64748b', name: 'Modern Blue' },
            success: { primary: '#059669', secondary: '#dc2626', name: 'Success Green' },
            professional: { primary: '#1f2937', secondary: '#6b7280', name: 'Professional Dark' },
            creative: { primary: '#8b5cf6', secondary: '#f59e0b', name: 'Creative Purple' },
            ecommerce: { primary: '#dc2626', secondary: '#059669', name: 'E-commerce Red' }
        };

        const [pagesData, setPagesData] = useState([{
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
        ])
        const [selected,setSelected]=useState(pagesData[0].key);
        const page=pagesData.find(p=>p.key===selected) || pagesData[0];

         function handleEdits(key, value) {

            //Direct Mutation: You're directly mutating the page object, which React won't detect as a state change
            //No State Update: pagesData is a const array, not state, so changes aren't preserved
            //No Re-render: React won't re-render because no state actually changed
            //Data Loss: When you switch between pages, changes are lost
            setPagesData(prevPages => 
                prevPages.map((p)=> 
                    p.key=== selected ? {...p, [key]: value } : p
                )
            );
            // In a real app, you would also want to persist these changes to a server or local storage
         }
        //for SEO optimization
        function EditPageMeta({page}){
            return(
                <div>
                   <div className="flex flex-col gap-4">
                    <label className="flex flex-col items-start text-lg font-bold px-2 text-white mb-2">
                        Page Title
                        <input className="px-2 mt-2 w-full rounded-xl border border-gray-300" value={page.title} type="text" placeholder="Edit Title Tag" onChange={e => handleEdits('title', e.target.value)} />
                    </label>

                    <label className="flex flex-col items-start text-lg font-bold px-2 text-white mb-2">
                          Page Description
                        <textarea className="px-2 mt-2 w-full h-20 rounded-xl border border-gray-300" value={page.metaDescription} placeholder="Edit Meta Description" onChange={e => handleEdits('metaDescription', e.target.value)} />
                    </label>
                   

                     <label className="flex flex-col items-start text-lg font-bold px-2 text-white mb-2">
                         Page Keywords
                         <input className="px-2 mt-2 w-full rounded-xl border border-gray-300" value={page.metaKeywords} type="text" placeholder="Edit Meta Keywords"  onChange={e=> handleEdits('metaKeywords', e.target.value)}/>
                    </label>
                    <br />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors" type="submit">Save</button>
                   </div>
                </div>
            );
        }

        function AdminMetaEditor() {
            return(
                <div>
                    <h2 className="text-white mb-4"> Editing Page Meta Data </h2>
                    <label className="flex flex-col items-center text-lg font-bold px-2">
                       <span className="text-white mb-2">Select Page</span>
                       <select className="page-Edits-select rounded-xl border border-gray-300 px-3 py-2" value={selected} onChange={e => setSelected(e.target.value)}>
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
                
                // Debug log to see if values are being applied
                console.log('Applied colors:', settings.primaryColor, settings.secondaryColor);
            }

        function handleChange(key, value) {
            console.log('Changing:', key, 'to:', value); // Debug log
            const newSettings = { ...settings, [key]: value };
            Setsettings(newSettings);
            applyBrandingSettings(newSettings); // Apply the new settings
        }


        function BrandingSettings({settings, onChange}) {
              //Use CSS variables for your color palette in your main CSS (e.g. :root) in index.css:
             return(
               <form className="page-Edits">
                  {/* Color Theme Presets */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Color Themes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(colorThemes).map(([key, theme]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            console.log('Theme clicked:', key, theme);
                            handleChange('primaryColor', theme.primary);
                            handleChange('secondaryColor', theme.secondary);
                            // Force immediate update
                            const newSettings = { 
                              ...settings, 
                              primaryColor: theme.primary, 
                              secondaryColor: theme.secondary 
                            };
                            Setsettings(newSettings);
                            applyBrandingSettings(newSettings);
                          }}
                          className="flex items-center mb-2 gap-2 p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                          style={{ backgroundColor: '#f9fafb' }}
                        >
                          <div className="flex gap-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300" 
                              style={{ backgroundColor: theme.primary }}
                            ></div>
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-300" 
                              style={{ backgroundColor: theme.secondary }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Color Pickers */}
                  <div className="flex flex-col gap-4 items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Custom Colors</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-lg">
                      <label className="flex flex-col items-center text-lg font-bold px-2">
                          <span className="mb-2 text-gray-700">Primary Color</span>
                          <div className="flex items-center gap-3">
                            <input 
                              className="rounded-xl border border-gray-300 w-16 h-16 cursor-pointer" 
                              type="color" 
                              value={settings.primaryColor} 
                              onChange={e => {
                                console.log('Primary color picker changed:', e.target.value);
                                handleChange("primaryColor", e.target.value);
                              }} 
                            />
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-600">HEX</span>
                              <input 
                                className="px-2 py-1 text-sm border rounded w-20" 
                                type="text" 
                                value={settings.primaryColor} 
                                onChange={e => {
                                  console.log('Primary HEX input changed:', e.target.value);
                                  handleChange("primaryColor", e.target.value);
                                }}
                                onBlur={e => {
                                  // Validate HEX color format
                                  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                                  if (!hexPattern.test(e.target.value)) {
                                    alert('Please enter a valid HEX color (e.g., #FF0000)');
                                    e.target.focus();
                                  }
                                }}
                              />
                            </div>
                          </div>
                      </label>
                      
                      <label className="flex flex-col items-center text-lg font-bold px-2">
                          <span className="mb-2 text-gray-700">Secondary Color</span>
                          <div className="flex items-center gap-3">
                            <input 
                              className="rounded-xl border border-gray-300 w-16 h-16 cursor-pointer" 
                              type="color" 
                              value={settings.secondaryColor} 
                              onChange={e => {
                                console.log('Secondary color picker changed:', e.target.value);
                                handleChange("secondaryColor", e.target.value);
                              }} 
                            />
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-600">HEX</span>
                              <input 
                                className="px-2 py-1 text-sm border rounded w-20" 
                                type="text" 
                                value={settings.secondaryColor} 
                                onChange={e => {
                                  console.log('Secondary HEX input changed:', e.target.value);
                                  handleChange("secondaryColor", e.target.value);
                                }}
                                onBlur={e => {
                                  // Validate HEX color format
                                  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                                  if (!hexPattern.test(e.target.value)) {
                                    alert('Please enter a valid HEX color (e.g., #FF0000)');
                                    e.target.focus();
                                  }
                                }}
                              />
                            </div>
                          </div>
                      </label>
                    </div>
                    
                    <label className="flex flex-col items-center text-lg font-bold px-2">
                         <span className="mb-2 text-gray-700">Font Family</span>
                        <input className="px-3 py-2 rounded-xl border border-gray-300 w-64" type="text" value={settings.fontFamily} onChange={e=> handleChange("fontFamily", e.target.value)} />
                    </label>

                    {/* Color Preview */}
                    <div className="mt-6 p-4 rounded-xl border border-gray-300 bg-gray-50">
                      <h4 className="text-md font-bold mb-2 text-gray-800">Color Preview</h4>
                      <div className="flex gap-4 items-center">
                        <div 
                          className="px-4 py-2 rounded-lg text-white font-medium"
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          Primary Button
                        </div>
                        <div 
                          className="px-4 py-2 rounded-lg text-white font-medium"
                          style={{ backgroundColor: settings.secondaryColor }}
                        >
                          Secondary Button
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-800 rounded-2xl bg-gray-800 p-6" style={{ backgroundColor: '#1f2937', borderRadius: '1rem', padding: '1.5rem' }}>
                    <AdminMetaEditor />
                    <br />
                    <EditPageMeta page={page} />
                  </div>
               </form> 
             );
        }

            return (    
                <div className="p-8 min-h-screen bg-gray-100" style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
                  <section className="my-16 mx-auto p-8 max-w-md bg-gray-800 border border-gray-600 rounded-2xl shadow-lg" style={{ margin: '4rem auto', padding: '2rem', maxWidth: '28rem', backgroundColor: '#1f2937', border: '1px solid #4b5563', borderRadius: '1rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
                       <ul className="space-y-4" style={{ listStyle: 'none', padding: 0 }}>
                             <li className="text-xl text-white font-semibold" style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: '600', marginBottom: '1rem' }}> 
                               <strong>Application Name:</strong> Products_Shop
                             </li>
                             <li className="text-xl flex items-center gap-3 text-white font-semibold" style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.75rem' }}> 
                               <strong>Web Icon:</strong> 
                               <img className="w-12 h-12 rounded-full border-2 border-white" src="/logo192.png" alt="Product Shop Icon" style={{ width: '3rem', height: '3rem', borderRadius: '50%', border: '2px solid #ffffff' }} />
                             </li>
                       </ul>
                   </section>

                   <section className="my-8 mx-auto p-6 max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200" style={{ margin: '2rem auto', padding: '1.5rem', maxWidth: '42rem', backgroundColor: '#ffffff', borderRadius: '1rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800" style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1f2937' }}>Branding Settings</h2>
                        <BrandingSettings settings={settings} onChange={handleChange} />
                   </section>
                   
                </div>
        );
}