# 07_kamera_code

## Besvarelse af refleksionsspørgsmålene til ImageScreen.js

### 1. Hvorfor bruger vi route.params her?
- Vi bruger route.params.image, fordi vi skal hente billedets URI, som blev sendt med navigationen.

Uddybning:
Når vi trykker på et billede i galleriet i CameraTest, navigerer vi til ImageScreen med:

````
navigation.navigate('image', { image: image.uri })
````
Her sender vi altså data videre i en parameter (image) til den nye skærm.
På ImageScreen henter vi så denne parameter igen med route.params.image.

Det betyder:
- CameraTest giver billedets URI som parameter,
- ImageScreen henter den parameter og bruger den til at vise billedet.

### 2. Hvad sker der, hvis route.params er tom?
Hvis route.params er tom, undgår vi fejl med || {}, og skærmen viser en fallback-tekst i stedet for et billede.

Uddybning: 
Hvis vi åbner ImageScreen uden at sende en parameter, så findes route.params ikke – eller er undefined.

Derfor har vi skrevet:
````
const { image } = route.params || {};
````
Hvis route.params findes → så får vi image ud af den.
Hvis route.params ikke findes → falder vi tilbage til {} og undgår en fejl.
I så fald vil image være undefined, og koden viser denne tekst i stedet:
````
<Text style={{ color: 'white' }}>Ingen billede valgt</Text>
````
