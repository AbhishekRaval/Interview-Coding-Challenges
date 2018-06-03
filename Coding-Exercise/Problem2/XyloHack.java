import java.util.Scanner;

public class XyloHack {

	private static Scanner reader;

	static String xyloHack(String input) {	   
		//Getting Number from Input String
		String num = input.substring(input.indexOf('(')+1, input.indexOf(')'));
		int number = Integer.parseInt(num);
		//Getting String
		String currStr = input.substring(1,input.indexOf('.')-1);
		String outputStr = "";
		//Processing input String on basis of Odd/Even Check
		if(number%2==0) {
			outputStr = currStr.toUpperCase();
		}
		else{
			outputStr = currStr.toLowerCase();
		}

		return outputStr;
	}

	public static void main(String[] args) {

		System.out.println("Problem2 ,First Input would be number of Lines,"
				+ " followed by consecutive inputs of Lines");	
		reader = new Scanner(System.in);

		// Variable Initialization	
		int noOfLines, i;
		String[] inputArray,OutputArray;
		i =0;
		noOfLines = reader.nextInt();
		inputArray = new String[noOfLines];
		OutputArray= new String[noOfLines];	

		//Reading Input through Stdin
		while(i<noOfLines){
			String currStr = reader.nextLine();
			if(!currStr.isEmpty()) {
				inputArray[i] = currStr;
				OutputArray[i] = xyloHack(currStr);
				i++;
			}
		}

		//Displaying Output	
		System.out.println("== OUTPUT ==");
		for(String line:OutputArray)
		{
			System.out.println(line);
		}
	}
}
