const presence = new Presence({
    clientId: "990900646301544468",
}), elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "https://ghosteshop.com/icon.png",
        startTimestamp: elapsed,
    }, type = window.location.hostname.split(".");
    if (type.length === 3) {
        presenceData.details = `Reading the ${type[0].toLowerCase()}`;
        presenceData.state = `Reading ${document.title}`;
    }
    else {
        const page = [
            "",
            ...window.location.pathname.split("/").filter(p => p.length),
        ];
        switch (page[page.length - 1]) {
            case "games": {
                presenceData.details = "Looking for a game";
                const titles = document.querySelectorAll(".v-card__title");
                if (titles.length === 2)
                    presenceData.state = titles[1].textContent;
                else
                    presenceData.state = "Viewing all games";
                break;
            }
            default: {
                presenceData.details = "Reading the Ghost eShop website";
                presenceData.state = "Home menu";
                break;
            }
        }
    }
    if (presenceData.details)
        presence.setActivity(presenceData);
    else
        presence.setActivity();
});
