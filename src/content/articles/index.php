<?php
// Function to generate a slug from a title
function generateSlug($title) {
    // Convert to lowercase, replace spaces with hyphens, and remove special characters
    return preg_replace('/[^A-Za-z0-9-]+/', '', str_replace(' ', '-', strtolower($title)));
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect data from the form
    $title = $_POST['title'] ?? 'Untitled Post';
    $description = $_POST['description'] ?? '';
    $keyword = isset($_POST['keywords']) ? explode(', ', $_POST['keywords']) : [];
    $keywords = json_encode($keyword);
    $category = $_POST['category'] ?? 'general';
    $imagee = $_FILES['image']['name'] ?? '';
    // Generate slug from title
    $slug = generateSlug($title);
    $imageExtension = pathinfo($imagee, PATHINFO_EXTENSION);
    $newImageName = $slug . '.' . $imageExtension;
    $image = $newImageName ?? '';
    // Define folder and file paths
    $folderPath = __DIR__ . '/' . $slug;
    $filePath = $folderPath . '/index.mdx';

    // Create the folder if it doesn't exist
    if (!file_exists($folderPath)) {
        mkdir($folderPath, 0777, true);
    }

    // Save the uploaded image in the folder
    if (!empty($image) && isset($_FILES['image']['tmp_name'])) {
        $imagePath = $folderPath . '/imgs/' . $image;
        mkdir($folderPath . '/imgs', 0777, true);
        move_uploaded_file($_FILES['image']['tmp_name'], $imagePath);
    }
    $startDate = strtotime('2024-11-11 00:00:00');
    $endDate = time(); // Current timestamp

    // Generate a random timestamp between start and end
    $randomTimestamp = rand($startDate, $endDate);

    // Convert the random timestamp to a DateTime object
    $randomDate = new DateTime();
    $randomDate->setTimestamp($randomTimestamp);
    $randomDate->setTimezone(new DateTimeZone('UTC')); // Set UTC timezone

    // Format the random date to the desired format
    $formattedDate = $randomDate->format('Y-m-d\TH:i:s.v\Z');
    // Prepare the content for the MDX file
    $mdxContent = <<<MDX
---
isDraft: false
isBigHeadline: false
isSmallHeadline: true
title: "{$title}"
description: "{$description}"
keywords: {$keywords}
cover: "./imgs/{$image}"
category: {$category}
publishedTime: "{$formattedDate}"
authors: ["priyansh-srivastava"]
---

MDX;

    // Write data to the file
    if (file_put_contents($filePath, $mdxContent)) {
        echo "Folder and MDX file created successfully at: $filePath";
        
    } else {
        echo "Failed to create the MDX file.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create MDX File</title>
    <style>
        /* General Reset */
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f9;
            color: #333;
        }

        /* Container */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        /* Form Container */
        form {
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }

        /* Form Elements */
        h1 {
            text-align: center;
            color: #444;
            margin-bottom: 20px;
        }

        label {
            font-weight: bold;
            margin-bottom: 5px;
            display: block;
            color: #555;
        }

        input[type="text"],
        textarea,
        input[type="file"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-sizing: border-box;
        }

        textarea {
            resize: none;
        }

        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #45a049;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            form {
                padding: 15px;
            }

            button {
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            h1 {
                font-size: 20px;
            }

            label {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>

        <label for="description">Description:</label>
        <textarea id="description" name="description" rows="5" cols="30" required></textarea>

        <label for="keywords">Keywords (comma-separated):</label>
        <input type="text" id="keywords" name="keywords" required>

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" required>

        <label for="image">Image:</label>
        <input type="file" id="image" name="image" accept="image/*" required>

        <button type="submit">Create MDX File</button>
    </form>
</body>
</html>
