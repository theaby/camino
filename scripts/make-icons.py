"""Draw the Camino app icons. Requires Pillow."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1] / "public" / "icons"
GREEN = (31, 122, 77, 255)
CREAM = (246, 241, 232, 255)
GOLD = (240, 180, 41, 255)


def draw(size: int, maskable: bool) -> Image.Image:
    image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)
    if maskable:
        draw.rectangle((0, 0, size, size), fill=GREEN)
        pad = int(size * 0.18)
    else:
        radius = int(size * 0.22)
        draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=GREEN)
        pad = int(size * 0.14)
    draw.ellipse((pad, pad, size - pad, size - pad), fill=CREAM)
    sun = int(size * 0.11)
    center_x = size // 2
    center_y = int(size * 0.43)
    draw.ellipse((center_x - sun, center_y - sun, center_x + sun, center_y + sun), fill=GOLD)
    bar_top = int(size * 0.64)
    bar_height = max(4, int(size * 0.07))
    draw.rounded_rectangle(
        (int(size * 0.32), bar_top, int(size * 0.68), bar_top + bar_height),
        radius=bar_height // 2,
        fill=GREEN,
    )
    return image


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    draw(192, False).save(ROOT / "icon-192.png")
    draw(512, False).save(ROOT / "icon-512.png")
    draw(512, True).save(ROOT / "icon-maskable-512.png")
    draw(180, False).save(ROOT / "apple-touch-icon.png")


if __name__ == "__main__":
    main()
