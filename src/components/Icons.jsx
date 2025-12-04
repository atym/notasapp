import React from 'react';

const IconWrapper = ({ children, size = 24, className = "", ...props }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`shrink-0 ${className}`} 
        {...props}
    >
        {children}
    </svg>
);

export const Icons = {
    User: (p)=><IconWrapper {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>,
    Globe: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/></IconWrapper>,
    MessageCircle: (p)=><IconWrapper {...p}><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></IconWrapper>,
    Calendar: (p)=><IconWrapper {...p}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconWrapper>,
    MapPin: (p)=><IconWrapper {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>,
    Check: (p)=><IconWrapper {...p}><path d="M20 6 9 17l-5-5"/></IconWrapper>,
    ChevronRight: (p)=><IconWrapper {...p}><path d="m9 18 6-6-6-6"/></IconWrapper>,
    ArrowLeft: (p)=><IconWrapper {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconWrapper>,
    Sun: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></IconWrapper>,
    Cloud: (p)=><IconWrapper {...p}><path d="M17.5 19c0-1.7-1.3-3-3-3h-1.3c-1.3-3.2-4.9-3.2-6.2 0H5.5c-2 0-3.5 1.5-3.5 3.5S3.5 23 5.5 23h12c1.7 0 3-1.3 3-3z"/></IconWrapper>,
    CloudRain: (p)=><IconWrapper {...p}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></IconWrapper>,
    Snowflake: (p)=><IconWrapper {...p}><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 20-4-4"/><path d="m4 4 4 4"/><path d="m4 20 4-4"/><path d="m20 4-4 4"/></IconWrapper>,
    Zap: (p)=><IconWrapper {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconWrapper>,
    Wind: (p)=><IconWrapper {...p}><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/></IconWrapper>,
    Thermometer: (p)=><IconWrapper {...p}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></IconWrapper>,
    Smile: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></IconWrapper>,
    Frown: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/></IconWrapper>,
    Coffee: (p)=><IconWrapper {...p}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/></IconWrapper>,
    Briefcase: (p)=><IconWrapper {...p}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></IconWrapper>,
    ChevronDown: (p)=><IconWrapper {...p}><path d="m6 9 6 6 6-6"/></IconWrapper>,
    Menu: (p)=><IconWrapper {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>,
    X: (p)=><IconWrapper {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>,
    BookOpen: (p)=><IconWrapper {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconWrapper>,
    // FIXED: Simpler Brain Icon for Ser/Estar
    BrainCircuit: (p)=><IconWrapper {...p}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></IconWrapper>,
    Users: (p)=><IconWrapper {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></IconWrapper>,
    BriefcaseMedical: (p)=><IconWrapper {...p}><path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/></IconWrapper>,
    Flag: (p)=><IconWrapper {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></IconWrapper>,
    Trash: (p)=><IconWrapper {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></IconWrapper>,
    HelpCircle: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></IconWrapper>,
    Award: (p)=><IconWrapper {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></IconWrapper>,
    BarChart: (p)=><IconWrapper {...p}><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></IconWrapper>,
    Type: (p)=><IconWrapper {...p}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></IconWrapper>,
    Hash: (p)=><IconWrapper {...p}><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></IconWrapper>,
    Clock: (p)=><IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>,
    HeartHandshake: (p)=><IconWrapper {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconWrapper>,
    // FIXED: New Icon for Saludos (MessageCircle + Heart combo)
    SmilePlus: (p)=><IconWrapper {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M15.8 9.2a2.5 2.5 0 0 0-3.5 0l-.55.55-.55-.55a2.5 2.5 0 0 0-3.5 3.5l.55.55 3.5 3.5 3.5-3.5.55-.55a2.5 2.5 0 0 0 0-3.5Z" /></IconWrapper>,
    BookA: (p)=><IconWrapper {...p}><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></IconWrapper>,
    ListChecks: (p)=><IconWrapper {...p}><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/><path d="M4 6h1"/><path d="M4 12h1"/><path d="M4 18h1"/></IconWrapper>,
    Palette: (p)=><IconWrapper {...p}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.093 0-.679.5-1.25 1.25-1.25H16c3.314 0 6-2.686 6-6 0-5.523-4.477-10-10-10Z"/></IconWrapper>,
    Mic: (p)=><IconWrapper {...p}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/></IconWrapper>
};