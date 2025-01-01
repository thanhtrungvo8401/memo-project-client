export const speakTheText = (text: string, failAction?: () => void) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = 'en-US';
    // utterance.voice = speechSynthesis.getVoices()[0];

    window.speechSynthesis.speak(utterance);
  } else {
    if (failAction) failAction();
    else
      alert(
        'Your browser do not support this function, please switch to Safari or Chrome',
      )!;
  }
};
