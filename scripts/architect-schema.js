// Generate individual schema markup for each architect
document.addEventListener('DOMContentLoaded', function() {
    const architects = [
        { 
            name: 'Aleven Concepts', 
            image: '/ARCHITECTS/ALEVEN CONCEPTS.jpg',
            specialty: 'Commercial Architecture',
            location: 'India'
        },
        { 
            name: 'Anagha Architects', 
            image: '/ARCHITECTS/ANAGHA ARCHITECTS.png',
            specialty: 'Residential Design',
            location: 'India'
        },
        { 
            name: 'Architectural Dialogue', 
            image: '/ARCHITECTS/ARCHITECTURAL DIALOGUE.png',
            specialty: 'Urban Planning',
            location: 'India'
        },
        // Add all other architects here with their specialties
    ];

    // Create schema script element
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';

    // Generate LocalBusiness schema for each architect
    const architectsSchema = architects.map(architect => ({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": architect.name,
        "image": `https://manasyati.com${architect.image}`,
        "description": `${architect.name} is a leading ${architect.specialty} firm partnered with Manasyati Engineering`,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
        },
        "makesOffer": {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": architect.specialty,
                "provider": {
                    "@type": "LocalBusiness",
                    "name": architect.name
                }
            }
        },
        "sameAs": "https://manasyati.com/architects.html",
        "isPartOf": {
            "@type": "Organization",
            "name": "Manasyati Engineering Partner Network"
        }
    }));

    // Add the schema to the script element
    schemaScript.textContent = JSON.stringify({ 
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": architectsSchema.map((schema, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": schema
        }))
    });

    // Add the script to the head
    document.head.appendChild(schemaScript);
});
