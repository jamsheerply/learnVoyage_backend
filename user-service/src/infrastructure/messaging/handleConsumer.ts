const handleConsumer = (msgType: string, message: any) => {
  switch (msgType) {
    case "addUser":
      const messageParse = JSON.parse(message);
      console.log(messageParse);
  }
};

export { handleConsumer };
