// INSTRUCTIONS:
// 1. This file is the single source of data for the seed script.
// 2. To seed a collection, replace the sample data in the `DATA` array below with the data you want to push.
// 3. After updating this file, open 'scripts/seed.js' and set the 'COLLECTION_TO_SEED' variable to your target collection name.
// 4. Run the script from your terminal: node scripts/seed.js

// The array must be named DATA and exported.
export const DATA = [
    { name: "El relámpago", desc: "The lightning", icon: "Zap" },
    { name: "Seco", desc: "Dry", icon: "Sun" },
    { name: "Hace mal tiempo", desc: "The weather is bad", icon: "Cloudy" },
    { name: "La lluvia", desc: "The rain", icon: "CloudRain" },
    { name: "Hay tormenta", desc: "There is a storm", icon: "Zap" },
    { name: "Hace frío", desc: "It is cold", icon: "Thermometer" },
    { name: "Hace viento", desc: "It is windy", icon: "Wind" },
    { name: "Está nevando", desc: "It is snowing", icon: "Snowflake" },
    { name: "Está parcialmente nublado", desc: "It is partly cloudy", icon: "Cloud" },
    { name: "La nieve", desc: "The snow", icon: "Snowflake" },
    { name: "Hace calor", desc: "It is hot", icon: "Thermometer" },
    { name: "Está lloviendo", desc: "It is raining", icon: "CloudRain" },
    { name: "Húmedo", desc: "Humid", icon: "Cloud" },
    { name: "Está soleado", desc: "It is sunny", icon: "Sun" },
    { name: "El arcoíris", desc: "The rainbow", icon: "Wind" },
    { name: "Está despejado", desc: "It is clear", icon: "Sun" },
    { name: "Hace buen tiempo", desc: "The weather is good", icon: "Sun" },
    { name: "Está nublado", desc: "It is cloudy", icon: "Cloud" },
    { name: "Hay niebla", desc: "It is foggy", category: "Hay", icon: "CloudFog" },
    { name: "Hace fresco", desc: "It is cool", category: "Hace", icon: "Thermometer" },
    { name: "El trueno", desc: "The thunder", category: "Noun", icon: "CloudLightning" },
    { name: "Está granizando", desc: "It is hailing", category: "Está", icon: "CloudHail" },
    { name: "El hielo", desc: "The ice", category: "Noun", icon: "Snowflake" },
    { name: "Un huracán", desc: "A hurricane", category: "Noun", icon: "Tornado" },
    { name: "Los grados", desc: "The degrees", category: "Noun", icon: "Thermometer" },
    { name: "El pronóstico", desc: "The forecast", category: "Noun", icon: "Newspaper" },
    { name: "Un aguacero", desc: "A downpour", category: "Noun/Descriptive", icon: "CloudRainWind" },
    { name: "El amanecer", desc: "The sunrise", category: "Noun/Visual", icon: "Sunrise" },
    { name: "Está lloviendo a cántaros", desc: "Una expresión que significa que llueve con mucha intensidad.", category: "Modismo", icon: "CloudDrizzle" },
    { name: "¿Qué tiempo hace?", desc: "La pregunta principal para saber sobre las condiciones atmosféricas.", category: "Pregunta Clave", icon: "HelpCircle" }
];