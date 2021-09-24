# Bachelorarbeit

This thesis was created in german and therefore the demo and the following description is also in german. If you have questions feel free to contact me.


## Kurzfassung
Traditionell werden Computer mit Tastatur und Maus gesteuert. Die neuen Fortschritte
im Bereich der künstlichen Intelligenz erlauben Alternativen, welche die Kommunikation
mit Computern erleichtern. Besonders Menschen mit Einschränkungen, Kinder oder
alte Menschen können durch diese Eingabemethoden unterstützt werden. Zwei dieser
alternativen Methoden werden in dieser Arbeit behandelt.

Im Rahmen dieser Bachelorarbeit wird deshalb ein audiovisuell gesteuerter Taschenrechner realisiert. Dieser soll sowohl per Sprache als auch per Handgestik gesteuert werden. Beide dieser Eingabemethoden sollen die zehn Ziffern, die Grundoperatoren der Addition, Subtraktion, Multiplikation und Division sowie das Gleichheitszeichen erkennen können. Diese bilden die fünfzehn Klassen zwischen denen unterschieden werden muss. Um dies zu erreichen wurde der Stand der Technik in den bereichen der Sprachund Gestenerkennung betrachtet und es wurden verschiedene Ansätze und Bibliotheken für die Umsetzung verglichen. Anhand der zuvor definierten Parametern wurde für jede Steuerungseinheit ein Ansatz gewählt. Mit diesen wurde ein System für den Prototypen definiert. Zur Umsetzung wurde zuerst ein Sprachklassifizierungsmodell erstellt, welches die gesprochenen Wörter den obigen genannten Klassen zuordnet. Dies funktionierte mit einer Genauigkeit von ungefähr 77%. Die Gestensteuerung wurde mit einem Modell erstellt, welches zuerst die Hand in einem Bild erkennt und darauf dann ein Gestenerkennungsmodell angewendet wird. Dabei werden wichtige Punkte auf der Hand erkannt, wie zum Beispiel die Fingerspitzen und Fingeransätze. Mit diesen Punkten und dem Vergleichen deren Koordinaten konnten individuelle Gesten erkannt werden. Bei der Zusammenführung dieser zwei Eingabemethoden wurde darauf geachtet, dass diese dynamisch und ohne dem Einwirken des Benutzers funktioniert. Dies wurde erreicht indem eine periodische Abtastung beide Eingänge auswertet und diese in die eigentliche Rechnung übernimmt. Sobald das Gleichheitszeichen eingegeben wurde, signalisiert dies das Ende der Rechnung. Die Rechnung wird ausgewertet und das Ergebnis wird angezeigt.

Es wurde ein voll funktionsfähiger Taschenrechner erstellt, der mit Sprache und
Handgestik gesteuert werden kann. Dabei wurde gezeigt wie die Kombination von zwei
solcher alternativen Eingabemethoden funktionieren kann.

## Demo
Im Ordner 'demo' ist der Code zu finden. Dabei ist der Taschenrechner in Form einer Webseite umgesetzt worden. Diese Demo dient der Verwendung und Visualisierung des Taschenrechners. 

- demo wird noch auf meiner rzei.github.io Seite zum Ausprobieren zur verfügung gestellt.
