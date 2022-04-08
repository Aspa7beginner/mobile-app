/*

            function readAll() {
                var request = db.transaction(["notes"])
                    .objectStore("notes")
                    .getAll();
                request.onsuccess = function(event) {
                    // loop over the records retrieved in event.target.result
                    event.target.result.forEach(function(note) {
                        //create div object
                        let noteHtml = document.createElement("div");
                        let dt = new Date(parseInt(note.date));
                        //set its attributes and content
                        noteHtml.id = note.date;
                        noteHtml.setAttribute("class",  "note");
                        noteHtml.setAttribute("onclick", "read(this.id);");
                        noteHtml.innerHTML = "<p>" + note.title + "</p><p>" + 
                            dt.toISOString().split('T')[0] + "</p><p style=\"color:" +
                            note.color + "\">&#9679;</p>";
                        
                        // add it to the respactive container in home page
                        document.getElementById("notes-container").appendChild(noteHtml);
                    });
                };
            }

            */

