export default function getCurrencyFormat(value) {
    if (isNaN(value)) {
        return;
    }

    return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(parseInt(value));
}