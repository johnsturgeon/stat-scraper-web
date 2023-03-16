/**
 * Returns the 'src' location for the platform logo image
 *
 * @param {string} platform
 * @return {string}
 */
function logoSrcFromPlatformName(platform) {
    return `${kImgDir}/platform_${platform.toLowerCase()}.webp`
}

/**
 *
 * @param {string} rank
 * @return {string}
 */
function rankSrcThumbFromRankName(rank) {
    const fixedString = rank.replace(/ /g, "_").toLowerCase()
    return `${kImgDir}/rank_${fixedString}_small.webp`
}

/**
 *
 * @param {string} rank
 * @return {string}
 */
function rankSrcFromRankName(rank) {
    const fixedString = rank.replace(/ /g, "_").toLowerCase()
    return `${kImgDir}/rank_${fixedString}.webp`
}
