import Image

#Image.open("./1.png")

#def cutImages(path_png, path_txt):
    #imgs = Image.open(path_png)
#	f = open(path_txt)
#    line = f.readline()
#	while line:
#		print(line,'\n')
#		line = f.readline()


#cutImages('','./1.txt')

f = open('./1.txt')
imgs = Image.open("./1.png")
imgs=imgs.convert('RGBA') 
line = f.readline()
filename = ''
curLine = 0
x = 0
y = 0
w = 0
h = 0
ox = 0
oy = 0
while x==0:
	curLine = curLine + 1
	#print line,
	if curLine == 1:
		filename = line.replace('\n','')
	
	if curLine == 3:
		#position
		tem = line.replace(' ','')
		tem = tem.replace('\n','')
		set0 = tem.split(':')
		set1 = set0[1].split(',')
		x = set1[0]
		y = set1[1]
		print x
		print y

	if curLine == 4:
		#size
		tem = line.replace(' ','')
		tem = tem.replace('\n','')
		set0 = tem.split(':')
		set1 = set0[1].split(',')
		w = set1[0]
		h = set1[1]
		print w
		print h

	if curLine == 6:
		tem = line.replace(' ','')
		tem = tem.replace('\n','')
		set0 = tem.split(':')
		set1 = set0[1].split(',')
		ox = set1[0]
		oy = set1[1]
		print ox
		print oy
	
	#x=int(int(x)+int(ox))
	#y=int(int(y)+int(oy))
	rect = (100, 100, 100, 100)

	cutImg = imgs.crop(rect)
	imgs.save('cut/'+filename+'.png','PNG')

	if curLine == 7:
		curLine = 0
	
	line = f.readline()