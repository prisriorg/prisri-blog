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
    $keywords = isset($_POST['keywords']) ? explode(',', $_POST['keywords']) : [];
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

    // Prepare the content for the MDX file
    $mdxContent = <<<MDX
---
isDraft: false
isBigHeadline: true
isSmallHeadline: true
title: "{$title}"
description: "{$description}"
keywords: ["{$keywords[0]}", "{$keywords[1]}", "{$keywords[2]}"]
cover: "./imgs/{$image}"
category: {$category}
publishedTime: "2024-11-19T00:00:00.000Z"
authors: ["priyansh-srivastava"]
---

# {$title}

{$description}
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
</head>
<body>
    <h1>Create MDX File</h1>
    <form action="" method="POST" enctype="multipart/form-data">
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title" required><br><br>

        <label for="description">Description:</label><br>
        <textarea id="description" name="description" rows="5" cols="30" required></textarea><br><br>

        <label for="keywords">Keywords (comma-separated):</label><br>
        <input type="text" id="keywords" name="keywords" required><br><br>

        <label for="category">Category:</label><br>
        <input type="text" id="category" name="category" required><br><br>

        <label for="image">Image:</label><br>
        <input type="file" id="image" name="image" accept="image/*"><br><br>

        <button type="submit">Create MDX File</button>
    </form>
</body>
</html>
