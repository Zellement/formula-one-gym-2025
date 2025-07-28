type Screens = Record<string, string>

export default defineNuxtPlugin(() => {
    // Only run the script in a development environment and on client-side
    if (process.env.NODE_ENV !== 'development' || import.meta.server) {
        return
    }

    const screenSizes: Screens = {
        '3xs': '21rem' /* 336px */,
        '2xs': '25.625rem' /* 410px */,
        xs: '30rem' /* 480px */,
        sm: '35rem' /* 560px */,
        md: '45.714rem' /* 658px */,
        lg: '54.875rem' /* 878px */,
        xl: '67.375rem' /* 1078px */,
        '2xl': '79.19rem' /* 1280px */,
        '3xl': '90rem' /* 1400px */,
        '4xl': '111.25rem' /* 1780px */
    }

    const updateScreenSize = (): void => {
        const screenSizeContainer: HTMLDivElement = document.getElementById(
            'tw-screen-size-container'
        ) as HTMLDivElement

        const width: number = window.innerWidth
        let screenSize: string = ''

        Object.entries(screenSizes).forEach(([key, size]) => {
            const minWidth = parseFloat(size.replace('rem', '')) * 16
            if (
                width >= minWidth &&
                width <
                    (parseFloat(screenSizes[key + 1]?.replace('rem', '')) *
                        16 || Infinity)
            ) {
                screenSize = key
            }
        })

        screenSizeContainer.innerText = 'screen: ' + screenSize
    }

    const screenSizeContainer: HTMLDivElement = document.createElement('div')
    screenSizeContainer.className =
        'fixed bottom-0 left-0 bg-black text-white  text-[12px] p-0.5 leading-none'
    screenSizeContainer.style.zIndex = '9999'
    screenSizeContainer.id = 'tw-screen-size-container'
    document.body.appendChild(screenSizeContainer)

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
})
