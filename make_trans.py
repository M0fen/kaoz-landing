from PIL import Image

def make_transparent():
    # Open the image
    img = Image.open('public/logoeme.png')
    img = img.convert('RGBA')
    
    # Get data
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # Grayscale value:
        g = (item[0] + item[1] + item[2]) / 3.0
        
        # We want black (g=0) to be opaque white (A=255, rgb=255)
        # We want white (g=255) to be transparent (A=0, rgb=255)
        # Smooth mapping
        a = int(255 - g)
        
        # Keep it white, just change alpha
        new_data.append((255, 255, 255, a))
        
    img.putdata(new_data)
    img.save('public/assets/logo-kaoz-transparent.png', 'PNG')

make_transparent()
