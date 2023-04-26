import { atomWithProxy } from 'jotai-valtio'
import { proxy } from 'valtio/vanilla'

const proxyState = proxy({
    intro: true,
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png'
});

const stateAtom = atomWithProxy(proxyState, { sync: true })

export default stateAtom;