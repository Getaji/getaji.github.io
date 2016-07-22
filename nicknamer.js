$(function() {
    /* jshint esnext:true */
    $.get("nickname_parts_compiled.txt").done((data) => {
        const parts = JSON.parse(data);
        console.log(parts);
        const parts1 = parts[0];
        const parts2 = parts[1];
        const parts1Len = parts1.length;
        const parts2Len = parts2.length;
        const patterns = ["12", "2の2", "112", "12の2"];
        const patternsLen = patterns.length;

        function randInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function select() {
            const pattern = patterns[randInt(0, patternsLen - 1)];
            return pattern.replace(/[12]/g, function(n) {
                if (n === "1") {
                    return parts1[randInt(0, parts1Len - 1)];
                } else {
                    return parts2[randInt(0, parts2Len - 1)];
                }
            });
        }

        const namesContainer = $("#names_list");
        function generate() {
            const size = Number($("#input_size").val());
            if (size < 1) {
                console.error("size too small.");
            }
            namesContainer.text("");
            for (var i = 0; i < size; i++) {
                namesContainer.append(`<li>${select()}</li>`);
            }
        }
        $("#button_generate").on("click", generate);
        generate();
    }).fail((a, b, c) => console.error(a, b, c));  // todo
});