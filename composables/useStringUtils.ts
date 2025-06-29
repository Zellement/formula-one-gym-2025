export const useStringUtils = () => {
    function truncate(text: string, maxLength: number): string {
        if (!text) return ''
        return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
    }

    return {
        truncate
    }
}
