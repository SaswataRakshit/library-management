-----Library Management Project-----

----------------------------------------------------------------
Architecture (Assumption- only one user is using the application)
----------------------------------------------------------------
Landing Page / Collections of available books in Library ---> User borrow one book at a time       						 		 ---> YES - Show error
														      |                                   								|
                                                               --->  Check If user has borrowed the same copy of the book earlier
																		|
																		 ---> NO                   							 ---> YES - Show error
																			   |                   							|
																				---> Check If user has borrowed 2 book already
																					 |
																					  ---> NO ---> Add the book to Borrow List
																								   |
																									---> Decrease copy from Available book list
																									     |
																										  ---> If only 1 copy available - remove from available book list
																										 |
																										  ---> If multiple copy available - decrease 1 copy
																												 
																												

																												
Borrowed Page / Collection of borrowed Books ---> User return book ---> Remove the book from borrowed list
												  |
												   ---> Check if some copy of the book already present in available book list - increase 1 copy in available list
												  |
												   ---> If the book is not present in available book list - add 1 copy of the book in available list
												   

-------------------											   
Run the application
-------------------
1. Run command prompt and go insite root folder of the project
2. Run command - npm install
3. Once npm install is done, Run Command - npm start
4. Application will run on localhost:3000

-------------------											   
Test the application
-------------------
1. Run command prompt and go insite root folder of the project
2. Run command - npm test