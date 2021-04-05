from pynput.keyboard import Key, Controller
import time

keyboard = Controller()

time.sleep(3)

keyboard.press(Key.tab)
keyboard.release(Key.tab)
time.sleep(.1)
keyboard.press(Key.tab)
keyboard.release(Key.tab)
time.sleep(.1)
keyboard.press(Key.tab)
keyboard.release(Key.tab)
time.sleep(.1)
keyboard.press(Key.tab)
keyboard.release(Key.tab)
time.sleep(.1)
keyboard.press(Key.enter)
keyboard.release(Key.enter)
time.sleep(.1)
keyboard.press(Key.tab)
keyboard.release(Key.tab)

for char in "A Perfect Circle":
    keyboard.press(char)
    keyboard.release(char)
    time.sleep(.12)

keyboard.press(Key.tab)
keyboard.release(Key.tab)

for char in "3 Libras":
    keyboard.press(char)
    keyboard.release(char)
    time.sleep(.1)

keyboard.press(Key.tab)
keyboard.release(Key.tab)

keyboard.press(Key.enter)
keyboard.release(Key.enter)

time.sleep(1)


for char in "Threw you the obvious And you flew with it on your back A name in your recollection Down among a million, say: Difficult enough to feel a little bit Disappointed, passed over. When I've looked right through, To see you naked and oblivious and you don't see me Well I threw you the obvious, Just to see if there's more behind the Eyes of a fallen angel, Eyes of a tragedy. Here I am expecting just a little bit Too much from the wounded But I see, See through it all, See through, And see you. So I threw you the obvious Do you see what occurs behind the Eyes of a fallen angel Eyes of a tragedy Well, oh well.. Apparently nothing. Apparently nothing at all. You don't You don't You don't see me You don't You don't You don't see me You don't You don't You don't see me You don't You don't You don't see me at all ":
    keyboard.press(char)
    keyboard.release(char)
    time.sleep(.05)
