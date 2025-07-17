/**
 * Provides helper functions for common tasks such as debouncing, throttling, and checking active pages.
 *
 * @returns {Object} An object containing the `debounce`, `throttle`, and `isActivePage` functions.
 */
export const useHelpers = () => {
    /**
     * Debounces a function, delaying its execution until after a specified wait time has elapsed
     * since the last time the function was invoked.
     *
     * @template T - The type of the function to debounce.
     * @param {T} func - The function to debounce.
     * @param {number} waitFor - The delay in milliseconds.
     * @param {boolean} [immediate=false] - Whether to run the function immediately on the first call.
     * @returns {(...args: Parameters<T>) => void} A debounced version of the provided function.
     */
    const debounce = <T extends (...args: any[]) => any>(
        func: T,
        waitFor: number,
        immediate = false
    ): ((...args: Parameters<T>) => void) => {
        let timeout: ReturnType<typeof setTimeout> | null = null

        return function (this: any, ...args: Parameters<T>) {
            const callNow = immediate && !timeout
            if (timeout) clearTimeout(timeout)

            timeout = setTimeout(() => {
                timeout = null
                if (!immediate) func.apply(this, args)
            }, waitFor)

            if (callNow) func.apply(this, args)
        }
    }

    /**
     * Throttles a function, ensuring it is only executed at most once within the specified wait time.
     *
     * @template T - The type of the function to throttle.
     * @param {T} func - The function to throttle.
     * @param {number} waitFor - The delay in milliseconds.
     * @returns {(...args: Parameters<T>) => void} A throttled version of the provided function.
     */
    const throttle = <T extends (...args: any[]) => any>(
        func: T,
        waitFor: number
    ): ((...args: Parameters<T>) => void) => {
        let lastTime = 0
        return function (this: any, ...args: Parameters<T>) {
            const now = Date.now()
            if (now - lastTime < waitFor) return
            lastTime = now
            func.apply(this, args)
        }
    }

    /**
     * Replaces placeholders in a string with corresponding values from a parameter object.
     *
     * @param {string} message - The string to replace placeholders in.
     * @param {Record<string, any>} params - An object containing key-value pairs to replace placeholders with.
     * @returns {string}
     */
    const replaceParams = (
        message: string,
        params: Record<string, any>
    ): string | null => {
        return (
            message?.replace(/{(\w+)}/g, (_match, key) => {
                return params?.[key] ?? `{${key}}`
            }) ?? null
        )
    }

    return {
        debounce,
        throttle,
        replaceParams
    }
}
