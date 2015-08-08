$(function() {
    var Image = function(name, id, tags, size) {
        this.name = name;
        this.id = id;
        this.tags = tags;
        this.size = size;
        this.url = "icons/" + id + ".png"
    };

    var images = [
        new Image("炎の宝石", "fire_gem", ["素材"], 16),
        new Image("緑の玉", "green_ball", ["素材"], 16),
        new Image("折り畳みナイフ", "knife", ["武器"], 16),
        new Image("氷の剣", "ice_sword", ["武器"], 16),
        new Image("指輪", "ring", ["装飾品"], 16),
        new Image("斧", "axe", ["道具"], 32),
        new Image("金槌", "hammer", ["道具"], 32),
        new Image("ブーメラン", "boomerang", ["武器"], 32),
        new Image("爪", "claw", ["武器"], 32),
    ];

    var imageTemplate = "<div class=\"icon\"><img src=\"${url}\"></div>";

    var html = $("#imageTemplate").render(images);
    $("#images").append(html);

    $("#submit").onclick = function() {
        var value = $("#query").value;
        alert(value);
    }
});/**
 * Created by Margherita on 2015/08/08.
 */
