export default (message: unknown) => {
    if (message instanceof Error) {
        parent.window.workspace.showMessage(message.message)
    } else { console.error(message) }
}