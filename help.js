const spaceBlank = (number) => {
    space = ' ';
    for (n = 1; n < number; n++) {
        space += ' '
    }
    return space;
}

const scripts = {
    scripts: {
        "help" : "Display help for commands and options.",
        "start:dev  <nameOfDashboard>": "Start a dev server to dahboard.",
        "build:sankhya  <nameOfDashboard>": "Build a production folder to dashboard.",
        "add:dashboard  <nameOfDashboard>": "Add a new folder for development dashboard."
    }
}


for (i in scripts['scripts']) {
    let msg = `${i}`;
    console.log(`npm run ${spaceBlank(2)}${msg}${spaceBlank(50-msg.length)}${scripts['scripts'][i]}`)
}

