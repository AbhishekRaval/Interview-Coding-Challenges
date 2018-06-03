import java.util.Scanner;

public class Problem1 {

	private static Scanner reader;

	public static void main(String[] args) {
		System.out.println("Welcome to problem 2");
		System.out.println("Enter Input, First Line would be number of files, followed by each file name and content");		
		reader = new Scanner(System.in);		

		int n = reader.nextInt();		
		FileData[] fileArray = new FileData[n];

		for(int i=0;i<n;i++)
		{
			int linecnt = 0;
			StringBuilder content = new StringBuilder();

			String name = reader.next();
			while(linecnt != 3) {
				String line = reader.nextLine();
				if(line.isEmpty() || line.equals("\n")) {
					linecnt++;			
				}
				else {
					content.append(line + "\n");
					linecnt=0;
				}				
			}
			fileArray[i] = new FileData(name, content);			
		}

		FileData output = combineFileData(fileArray);		
		System.out.println("== OUTPUT ==");
		System.out.println(output.name);
		System.out.println(output.content);
	}

	//It cleans the data, combine FileName in CamelCase form and Combines data
	static FileData combineFileData(FileData[] fileArray) {
		String extension = fileArray[0].name.substring(fileArray[0].name.indexOf('.')+1);

		StringBuilder filename = new StringBuilder();
		StringBuilder outputContent = new StringBuilder();


		for(int i=0;i<fileArray.length;i++) {
			//Local variable for File Name
			String currFiName = fileArray[i].name;
			//extracting content before '.'
			currFiName = currFiName.substring(0,currFiName.indexOf('.'));
			//formating content
			currFiName = formatContent(currFiName);
			if(i != 0) {
				currFiName = currFiName.substring(0,1).toUpperCase() + currFiName.substring(1).toLowerCase();
				filename.append(currFiName);
			}
			else
			{
				currFiName = currFiName.toLowerCase();
				filename.append(currFiName);
			}
			StringBuilder contentTemp = fileArray[i].content ;						
			String cont = formatContent(contentTemp.toString());
			outputContent.append(cont);
		}

		//Finally we have combined file name
		String file = filename.toString() + "." + extension;
		FileData output = new FileData(file, outputContent);

		return output;
	}

	//removes any `$` characters and extra newlines(empty lines) present	
	static String formatContent(String input) {

		String output = input.replaceAll("\n{2,}", "\n").replaceAll("\\$","");					
		return output;
	}

}

//Abstract Data Type for handling file queries
class FileData {
	String name;
	StringBuilder content;
	FileData(String name, StringBuilder content){
		this.name = name;
		this.content = content;
	}
	FileData(){

	}
}


